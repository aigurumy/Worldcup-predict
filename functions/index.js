const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();
const db = getFirestore();

const API_KEY = process.env.SPORTS_API_KEY;
const API_URL = 'https://v3.football.api-sports.io/fixtures?league=1&season=2022';

// Initialize stripe lazy to avoid crash on deploy if env is missing
const getStripe = () => require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
exports.createStripeCheckout = onCall(async (request) => {
  const uid = request.auth?.uid;
  if (!uid) {
    throw new HttpsError('unauthenticated', 'User must be logged in.');
  }

  const { returnUrl } = request.data;
  if (!returnUrl) {
    throw new HttpsError('invalid-argument', 'The function must be called with a returnUrl.');
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'World Cup 2026 Full Access',
              description: 'Unlock all matches after Day 1 free trial.',
            },
            unit_amount: 500, // $5.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?canceled=true`,
      client_reference_id: uid,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    throw new HttpsError('internal', 'Unable to create checkout session.');
  }
});

// Verify Payment Success
exports.verifyStripePayment = onCall(async (request) => {
  const uid = request.auth?.uid;
  if (!uid) throw new HttpsError('unauthenticated', 'User must be logged in.');

  const { sessionId } = request.data;
  if (!sessionId) throw new HttpsError('invalid-argument', 'Missing sessionId.');

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid' && session.client_reference_id === uid) {
      // Upgrade user in Firestore
      await db.collection('users').doc(uid).update({
        isPremium: true
      });
      return { success: true };
    } else {
      return { success: false, message: 'Payment not completed or user mismatch.' };
    }
  } catch (error) {
    console.error("Stripe verification failed:", error);
    throw new HttpsError('internal', 'Unable to verify payment.');
  }
});

exports.syncMatchData = onSchedule("every 15 minutes", async (event) => {
  console.log("Starting Enterprise-Scale match sync...");

  if (!API_KEY) {
    console.error("Missing API Key. Check your .env file.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": API_KEY
      }
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    const apiMatches = data.response;
    console.log(`Fetched ${apiMatches.length} matches from API.`);

    // In a fully integrated app, we would loop through newly finished apiMatches
    // and query specific matches:
    // .where('matchId', '==', finishedMatch.fixture.id)
    
    // For our simulated environment, we will process all unawarded predictions globally
    // using a highly efficient Collection Group Query
    const unawardedQuery = db.collectionGroup('predictions').where('awarded', '!=', true);
    const unawardedSnap = await unawardedQuery.get();

    console.log(`Found ${unawardedSnap.size} unawarded predictions across all users.`);

    let batch = db.batch();
    let operationCount = 0;
    let totalUpdated = 0;

    for (const doc of unawardedSnap.docs) {
      const pred = doc.data();
      const predRef = doc.ref;

      // Extract the userId from the document reference path: users/{userId}/predictions/{matchId}
      const userId = predRef.parent.parent.id;
      const userRef = db.doc(`users/${userId}`);

      if (pred.scoreA !== undefined && pred.scoreA !== null) {
        // 1. Mark prediction as awarded
        batch.update(predRef, { awarded: true });
        operationCount++;

        // 2. Atomically increment the user's total points
        batch.update(userRef, { points: FieldValue.increment(3) });
        operationCount++;

        totalUpdated++;

        // Firestore strict limit is 500 operations per batch
        if (operationCount >= 498) {
          await batch.commit();
          console.log(`Committed a chunk of ${operationCount} operations to the database.`);
          
          // Reset batch and counter for the next chunk
          batch = db.batch();
          operationCount = 0;
        }
      }
    }

    // Commit any remaining operations that didn't hit the 500 limit
    if (operationCount > 0) {
      await batch.commit();
    }

    console.log(`Enterprise Sync Complete! Successfully distributed points for ${totalUpdated} predictions.`);

  } catch (error) {
    console.error("Error during scheduled sync:", error);
  }
});
