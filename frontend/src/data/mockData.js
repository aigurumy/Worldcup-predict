/* ============================================
   WORLDCUP GOALS — Mock Data
   FIFA World Cup 2026™
   ============================================ */

export const countries = [
  { code: 'usa', name: 'United States', flag: '/flags/usa.png' },
  { code: 'mex', name: 'Mexico', flag: '/flags/mexico.png' },
  { code: 'can', name: 'Canada', flag: '/flags/canada.png' },
  { code: 'bra', name: 'Brazil', flag: '/flags/brazil.png' },
  { code: 'arg', name: 'Argentina', flag: '/flags/argentina.png' },
  { code: 'fra', name: 'France', flag: '/flags/france.png' },
  { code: 'ger', name: 'Germany', flag: '/flags/germany.png' },
  { code: 'esp', name: 'Spain', flag: '/flags/spain.png' },
  { code: 'eng', name: 'England', flag: '/flags/england.png' },
  { code: 'por', name: 'Portugal', flag: '/flags/portugal.png' },
  { code: 'ned', name: 'Netherlands', flag: '/flags/netherlands.png' },
  { code: 'jpn', name: 'Japan', flag: '/flags/japan.png' },
  { code: 'kor', name: 'South Korea', flag: '/flags/south_korea.png' },
  { code: 'ksa', name: 'Saudi Arabia', flag: '/flags/saudi_arabia.png' },
  { code: 'nga', name: 'Nigeria', flag: '/flags/nigeria.png' },
  { code: 'sen', name: 'Senegal', flag: '/flags/senegal.png' },
  { code: 'aus', name: 'Australia', flag: '/flags/australia.png' },
  { code: 'bel', name: 'Belgium', flag: '/flags/belgium.svg' },
  { code: 'col', name: 'Colombia', flag: '/flags/colombia.svg' },
  { code: 'uru', name: 'Uruguay', flag: '/flags/uruguay.svg' },
  { code: 'cro', name: 'Croatia', flag: '/flags/croatia.svg' },
  { code: 'mar', name: 'Morocco', flag: '/flags/morocco.svg' },
  { code: 'ita', name: 'Italy', flag: '/flags/italy.svg' },
  { code: 'den', name: 'Denmark', flag: '/flags/denmark.svg' },
  { code: 'swi', name: 'Switzerland', flag: '/flags/switzerland.svg' },
  { code: 'pol', name: 'Poland', flag: '/flags/poland.svg' },
  { code: 'cam', name: 'Cameroon', flag: '/flags/cameroon.svg' },
  { code: 'ecu', name: 'Ecuador', flag: '/flags/ecuador.svg' },
  { code: 'ser', name: 'Serbia', flag: '/flags/serbia.svg' },
  { code: 'gha', name: 'Ghana', flag: '/flags/ghana.svg' },
  { code: 'irn', name: 'Iran', flag: '/flags/iran.svg' },
  { code: 'wal', name: 'Wales', flag: '/flags/wales.svg' },
  { code: 'crc', name: 'Costa Rica', flag: '/flags/costa_rica.svg' },
  { code: 'tun', name: 'Tunisia', flag: '/flags/tunisia.svg' },
  { code: 'chl', name: 'Chile', flag: '/flags/chile.svg' },
  { code: 'par', name: 'Paraguay', flag: '/flags/paraguay.svg' },
  { code: 'per', name: 'Peru', flag: '/flags/peru.svg' },
  { code: 'jam', name: 'Jamaica', flag: '/flags/jamaica.svg' },
  { code: 'hon', name: 'Honduras', flag: '/flags/honduras.svg' },
  { code: 'pan', name: 'Panama', flag: '/flags/panama.svg' },
  { code: 'nzl', name: 'New Zealand', flag: '/flags/new_zealand.svg' },
  { code: 'qat', name: 'Qatar', flag: '/flags/qatar.svg' },
  { code: 'ukr', name: 'Ukraine', flag: '/flags/ukraine.svg' },
  { code: 'sco', name: 'Scotland', flag: '/flags/scotland.svg' },
  { code: 'aut', name: 'Austria', flag: '/flags/austria.svg' },
  { code: 'swe', name: 'Sweden', flag: '/flags/sweden.svg' },
  { code: 'nor', name: 'Norway', flag: '/flags/norway.svg' },
  { code: 'cze', name: 'Czech Republic', flag: '/flags/czech_republic.svg' },
];

export const matches = [
  // Match Day 1 — June 11, 2026
  {
    id: 'm1',
    date: '2026-06-11',
    dateLabel: 'Wednesday, June 11, 2026',
    time: '18:00',
    group: 'Group A',
    matchLabel: 'Match 1',
    teamA: { name: 'Mexico', code: 'mex', flag: '/flags/mexico.png' },
    teamB: { name: 'Canada', code: 'can', flag: '/flags/canada.png' },
    kickoff: '2026-06-11T18:00:00-05:00',
    venue: 'Estadio Azteca, Mexico City',
  },
  {
    id: 'm2',
    date: '2026-06-11',
    dateLabel: 'Wednesday, June 11, 2026',
    time: '21:00',
    group: 'Group A',
    matchLabel: 'Match 2',
    teamA: { name: 'United States', code: 'usa', flag: '/flags/usa.png' },
    teamB: { name: 'Colombia', code: 'col', flag: '/flags/colombia.svg' },
    kickoff: '2026-06-11T21:00:00-04:00',
    venue: 'MetLife Stadium, New Jersey',
  },
  // Match Day 2 — June 12, 2026
  {
    id: 'm3',
    date: '2026-06-12',
    dateLabel: 'Thursday, June 12, 2026',
    time: '15:00',
    group: 'Group B',
    matchLabel: 'Match 3',
    teamA: { name: 'Brazil', code: 'bra', flag: '/flags/brazil.png' },
    teamB: { name: 'Nigeria', code: 'nga', flag: '/flags/nigeria.png' },
    kickoff: '2026-06-12T15:00:00-04:00',
    venue: 'AT&T Stadium, Dallas',
  },
  {
    id: 'm4',
    date: '2026-06-12',
    dateLabel: 'Thursday, June 12, 2026',
    time: '18:00',
    group: 'Group C',
    matchLabel: 'Match 4',
    teamA: { name: 'France', code: 'fra', flag: '/flags/france.png' },
    teamB: { name: 'Australia', code: 'aus', flag: '/flags/australia.png' },
    kickoff: '2026-06-12T18:00:00-04:00',
    venue: 'SoFi Stadium, Los Angeles',
  },
  {
    id: 'm5',
    date: '2026-06-12',
    dateLabel: 'Thursday, June 12, 2026',
    time: '21:00',
    group: 'Group C',
    matchLabel: 'Match 5',
    teamA: { name: 'Argentina', code: 'arg', flag: '/flags/argentina.png' },
    teamB: { name: 'Saudi Arabia', code: 'ksa', flag: '/flags/saudi_arabia.png' },
    kickoff: '2026-06-12T21:00:00-04:00',
    venue: 'Hard Rock Stadium, Miami',
  },
  // Match Day 3 — June 13, 2026
  {
    id: 'm6',
    date: '2026-06-13',
    dateLabel: 'Friday, June 13, 2026',
    time: '15:00',
    group: 'Group D',
    matchLabel: 'Match 6',
    teamA: { name: 'Germany', code: 'ger', flag: '/flags/germany.png' },
    teamB: { name: 'Japan', code: 'jpn', flag: '/flags/japan.png' },
    kickoff: '2026-06-13T15:00:00-04:00',
    venue: 'Lincoln Financial Field, Philadelphia',
  },
  {
    id: 'm7',
    date: '2026-06-13',
    dateLabel: 'Friday, June 13, 2026',
    time: '18:00',
    group: 'Group D',
    matchLabel: 'Match 7',
    teamA: { name: 'Spain', code: 'esp', flag: '/flags/spain.png' },
    teamB: { name: 'South Korea', code: 'kor', flag: '/flags/south_korea.png' },
    kickoff: '2026-06-13T18:00:00-04:00',
    venue: 'BMO Stadium, Toronto',
  },
  {
    id: 'm8',
    date: '2026-06-13',
    dateLabel: 'Friday, June 13, 2026',
    time: '21:00',
    group: 'Group E',
    matchLabel: 'Match 8',
    teamA: { name: 'England', code: 'eng', flag: '/flags/england.png' },
    teamB: { name: 'Senegal', code: 'sen', flag: '/flags/senegal.png' },
    kickoff: '2026-06-13T21:00:00-04:00',
    venue: 'Lumen Field, Seattle',
  },
];

export const leaderboardGlobal = [
  { rank: 1, username: 'GoalKing99', country: 'Brazil', flag: '/flags/brazil.png', points: 2450, avatar: '👑' },
  { rank: 2, username: 'FutbolMaster', country: 'Argentina', flag: '/flags/argentina.png', points: 2380, avatar: '⚡' },
  { rank: 3, username: 'PredictorElite', country: 'Germany', flag: '/flags/germany.png', points: 2310, avatar: '🎯' },
  { rank: 4, username: 'ScoreWizard', country: 'Spain', flag: '/flags/spain.png', points: 2245, avatar: '🧙' },
  { rank: 5, username: 'MatchDay_Pro', country: 'England', flag: '/flags/england.png', points: 2190, avatar: '📊' },
  { rank: 6, username: 'WorldCupFan', country: 'France', flag: '/flags/france.png', points: 2140, avatar: '🏟️' },
  { rank: 7, username: 'TotalGoals', country: 'Netherlands', flag: '/flags/netherlands.png', points: 2080, avatar: '⚽' },
  { rank: 8, username: 'StrikerMind', country: 'Portugal', flag: '/flags/portugal.png', points: 2025, avatar: '🔥' },
  { rank: 9, username: 'NetBuster22', country: 'United States', flag: '/flags/usa.png', points: 1990, avatar: '💥' },
  { rank: 10, username: 'TopBins', country: 'Mexico', flag: '/flags/mexico.png', points: 1945, avatar: '🥅' },
  { rank: 11, username: 'KickOff_King', country: 'Japan', flag: '/flags/japan.png', points: 1900, avatar: '👟' },
  { rank: 12, username: 'FinalWhistle', country: 'South Korea', flag: '/flags/south_korea.png', points: 1875, avatar: '🏁' },
  { rank: 13, username: 'GoldenBoot', country: 'Belgium', flag: '/flags/belgium.svg', points: 1840, avatar: '👢' },
  { rank: 14, username: 'CornerKick', country: 'Croatia', flag: '/flags/croatia.svg', points: 1810, avatar: '🚩' },
  { rank: 15, username: 'HatTrickHero', country: 'Nigeria', flag: '/flags/nigeria.png', points: 1780, avatar: '🎩' },
  { rank: 16, username: 'PenaltyPro', country: 'Morocco', flag: '/flags/morocco.svg', points: 1750, avatar: '🎪' },
  { rank: 17, username: 'VARcheck', country: 'Canada', flag: '/flags/canada.png', points: 1720, avatar: '📺' },
  { rank: 18, username: 'OffsideTrap', country: 'Australia', flag: '/flags/australia.png', points: 1690, avatar: '🪤' },
  { rank: 19, username: 'Tiki_Taka', country: 'Colombia', flag: '/flags/colombia.svg', points: 1660, avatar: '💃' },
  { rank: 20, username: 'CupDreamer', country: 'Senegal', flag: '/flags/senegal.png', points: 1630, avatar: '🌟' },
];

export const leaderboardNational = [
  { rank: 1, username: 'NetBuster22', country: 'United States', flag: '/flags/usa.png', points: 1990, avatar: '💥' },
  { rank: 2, username: 'EagleEye_US', country: 'United States', flag: '/flags/usa.png', points: 1620, avatar: '🦅' },
  { rank: 3, username: 'SoccerSam', country: 'United States', flag: '/flags/usa.png', points: 1580, avatar: '🇺🇸' },
  { rank: 4, username: 'USMNT_Fan', country: 'United States', flag: '/flags/usa.png', points: 1540, avatar: '⭐' },
  { rank: 5, username: 'GoalRush_NYC', country: 'United States', flag: '/flags/usa.png', points: 1490, avatar: '🗽' },
  { rank: 6, username: 'StarsStripes', country: 'United States', flag: '/flags/usa.png', points: 1445, avatar: '🎆' },
  { rank: 7, username: 'PredictorLA', country: 'United States', flag: '/flags/usa.png', points: 1400, avatar: '🌴' },
  { rank: 8, username: 'WorldCup26', country: 'United States', flag: '/flags/usa.png', points: 1355, avatar: '🏆' },
  { rank: 9, username: 'AmericanGoal', country: 'United States', flag: '/flags/usa.png', points: 1310, avatar: '🎯' },
  { rank: 10, username: 'MidwestKick', country: 'United States', flag: '/flags/usa.png', points: 1270, avatar: '🌾' },
  { rank: 11, username: 'FloridaFan', country: 'United States', flag: '/flags/usa.png', points: 1230, avatar: '🐊' },
  { rank: 12, username: 'TexasGoal', country: 'United States', flag: '/flags/usa.png', points: 1190, avatar: '🤠' },
  { rank: 13, username: 'PacificPred', country: 'United States', flag: '/flags/usa.png', points: 1150, avatar: '🌊' },
  { rank: 14, username: 'BostonBall', country: 'United States', flag: '/flags/usa.png', points: 1110, avatar: '🎒' },
  { rank: 15, username: 'ChicagoShot', country: 'United States', flag: '/flags/usa.png', points: 1070, avatar: '🏙️' },
];

export const mockPlayers = {
  mex: [
    { id: 'mex-1', name: 'S. Giménez', number: 11, position: 'FW' },
    { id: 'mex-2', name: 'H. Lozano', number: 22, position: 'FW' },
    { id: 'mex-3', name: 'E. Álvarez', number: 4, position: 'MF' },
  ],
  can: [
    { id: 'can-1', name: 'A. Davies', number: 19, position: 'DF' },
    { id: 'can-2', name: 'J. David', number: 20, position: 'FW' },
    { id: 'can-3', name: 'T. Buchanan', number: 11, position: 'FW' },
  ],
  usa: [
    { id: 'usa-1', name: 'C. Pulisic', number: 10, position: 'FW' },
    { id: 'usa-2', name: 'T. Weah', number: 21, position: 'FW' },
    { id: 'usa-3', name: 'W. McKennie', number: 8, position: 'MF' },
  ],
  col: [
    { id: 'col-1', name: 'L. Díaz', number: 7, position: 'FW' },
    { id: 'col-2', name: 'J. Rodríguez', number: 10, position: 'MF' },
    { id: 'col-3', name: 'R. Borré', number: 19, position: 'FW' },
  ],
  bra: [
    { id: 'bra-1', name: 'Vinícius Jr', number: 7, position: 'FW' },
    { id: 'bra-2', name: 'Rodrygo', number: 11, position: 'FW' },
    { id: 'bra-3', name: 'Neymar Jr', number: 10, position: 'FW' },
  ],
  nga: [
    { id: 'nga-1', name: 'V. Osimhen', number: 9, position: 'FW' },
    { id: 'nga-2', name: 'S. Chukwueze', number: 11, position: 'FW' },
    { id: 'nga-3', name: 'A. Lookman', number: 18, position: 'FW' },
  ],
  fra: [
    { id: 'fra-1', name: 'K. Mbappé', number: 10, position: 'FW' },
    { id: 'fra-2', name: 'A. Griezmann', number: 7, position: 'FW' },
    { id: 'fra-3', name: 'O. Dembélé', number: 11, position: 'FW' },
  ],
  aus: [
    { id: 'aus-1', name: 'M. Duke', number: 15, position: 'FW' },
    { id: 'aus-2', name: 'C. Goodwin', number: 23, position: 'MF' },
    { id: 'aus-3', name: 'J. Irvine', number: 22, position: 'MF' },
  ],
  arg: [
    { id: 'arg-1', name: 'L. Messi', number: 10, position: 'FW' },
    { id: 'arg-2', name: 'J. Álvarez', number: 9, position: 'FW' },
    { id: 'arg-3', name: 'A. Mac Allister', number: 20, position: 'MF' },
  ],
  ksa: [
    { id: 'ksa-1', name: 'S. Al-Dawsari', number: 10, position: 'FW' },
    { id: 'ksa-2', name: 'F. Al-Buraikan', number: 9, position: 'FW' },
    { id: 'ksa-3', name: 'M. Kanno', number: 23, position: 'MF' },
  ],
  ger: [
    { id: 'ger-1', name: 'J. Musiala', number: 14, position: 'MF' },
    { id: 'ger-2', name: 'F. Wirtz', number: 17, position: 'MF' },
    { id: 'ger-3', name: 'K. Havertz', number: 7, position: 'FW' },
  ],
  jpn: [
    { id: 'jpn-1', name: 'K. Mitoma', number: 9, position: 'MF' },
    { id: 'jpn-2', name: 'T. Kubo', number: 20, position: 'MF' },
    { id: 'jpn-3', name: 'W. Endo', number: 6, position: 'MF' },
  ],
  esp: [
    { id: 'esp-1', name: 'Lamine Yamal', number: 19, position: 'FW' },
    { id: 'esp-2', name: 'N. Williams', number: 11, position: 'FW' },
    { id: 'esp-3', name: 'Pedri', number: 20, position: 'MF' },
  ],
  kor: [
    { id: 'kor-1', name: 'Son Heung-min', number: 7, position: 'FW' },
    { id: 'kor-2', name: 'Hwang Hee-chan', number: 11, position: 'FW' },
    { id: 'kor-3', name: 'Lee Kang-in', number: 18, position: 'MF' },
  ],
  eng: [
    { id: 'eng-1', name: 'H. Kane', number: 9, position: 'FW' },
    { id: 'eng-2', name: 'J. Bellingham', number: 10, position: 'MF' },
    { id: 'eng-3', name: 'B. Saka', number: 7, position: 'FW' },
  ],
  sen: [
    { id: 'sen-1', name: 'S. Mané', number: 10, position: 'FW' },
    { id: 'sen-2', name: 'I. Sarr', number: 18, position: 'FW' },
    { id: 'sen-3', name: 'N. Jackson', number: 9, position: 'FW' },
  ]
};

export const mockFinishedMatches = [
  {
    id: 'm1',
    date: '2026-06-11',
    matchLabel: 'Match 1',
    teamA: { name: 'Mexico', code: 'mex', flag: '/flags/mexico.png' },
    teamB: { name: 'Canada', code: 'can', flag: '/flags/canada.png' },
    actualScoreA: 2,
    actualScoreB: 1,
    actualFirstScorer: 'S. Giménez',
    actualAnytimeScorers: ['S. Giménez', 'H. Lozano', 'J. David']
  },
  {
    id: 'm2',
    date: '2026-06-11',
    matchLabel: 'Match 2',
    teamA: { name: 'United States', code: 'usa', flag: '/flags/usa.png' },
    teamB: { name: 'Colombia', code: 'col', flag: '/flags/colombia.svg' },
    actualScoreA: 0,
    actualScoreB: 0,
    actualFirstScorer: 'None',
    actualAnytimeScorers: ['None']
  }
];

export const mockUserPredictions = {
  'm1': {
    scoreA: 2,
    scoreB: 1,
    winner: 'A',
    totalGoals: 3,
    goalDiff: 1,
    firstScorer: 'S. Giménez',
    anytimeScorer: 'J. David'
  },
  'm2': {
    scoreA: 2,
    scoreB: 0,
    winner: 'A',
    totalGoals: 2,
    goalDiff: 2,
    firstScorer: 'C. Pulisic',
    anytimeScorer: 'T. Weah'
  }
};

// Helper: group matches by date
export function groupMatchesByDate(matchList) {
  const groups = [];
  let currentDate = null;
  let currentGroup = null;

  for (const match of matchList) {
    if (match.date !== currentDate) {
      currentDate = match.date;
      currentGroup = { date: match.date, dateLabel: match.dateLabel, matches: [] };
      groups.push(currentGroup);
    }
    currentGroup.matches.push(match);
  }

  return groups;
}

// Helper: check if a username is already taken in a specific country
export function checkUsernameExists(username, countryCode) {
  if (!username || !countryCode) return false;
  
  // Find the country name to match with leaderboard
  const countryObj = countries.find(c => c.code === countryCode);
  if (!countryObj) return false;
  
  const qName = username.toLowerCase().trim();
  
  return leaderboardGlobal.some(entry => 
    entry.username.toLowerCase() === qName && 
    entry.country === countryObj.name
  );
}

export const mockAchievements = [
  { id: 'a1', title: 'First Blood', description: 'Make your first match prediction.', icon: '🎯', isUnlocked: true },
  { id: 'a2', title: 'Perfect Score', description: 'Predict an exact match score correctly.', icon: '🏆', isUnlocked: true },
  { id: 'a3', title: 'Hat-Trick', description: 'Get 3 predictions completely right in a row.', icon: '🎩', isUnlocked: false },
  { id: 'a4', title: 'Psychic', description: 'Earn over 500 points in a single match day.', icon: '🔮', isUnlocked: false },
  { id: 'a5', title: 'Loyal Fan', description: 'Predict every match for your home country.', icon: '❤️', isUnlocked: true },
  { id: 'a6', title: 'Underdog Backer', description: 'Correctly predict a win for a team ranked 15+ spots lower.', icon: '🐺', isUnlocked: false },
];
