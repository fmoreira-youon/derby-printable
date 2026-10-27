// Snapshot from derby-digital/fase2-game-engine. English print copy; rules and quantities preserved.
const FIELD_DUELS = [
  // Físico
  { name: 'Physical vs Pace',    kind: 'FIELD', duelAttributes: ['physicality', 'pace'],        action: undefined },
  { name: 'Physical vs Tackling',    kind: 'FIELD', duelAttributes: ['physicality', 'tackle'],      action: undefined },
  { name: 'Physical vs Shooting',kind: 'FIELD', duelAttributes: ['physicality', 'finishing'],   action: undefined },
  { name: 'Physical vs Overall',    kind: 'FIELD', duelAttributes: ['physicality', 'overall'],     action: undefined },
  { name: 'Physical vs Mental',     kind: 'FIELD', duelAttributes: ['physicality', 'mental'],      action: undefined },
  {
    name: 'Physical vs Physical',
    kind: 'FIELD',
    duelAttributes: ['physicality', 'physicality'],
    action: { description: 'The winner may draw a special card.', trigger: 'duel_win' }
  },
  {
    name: 'Physical vs Technique',
    kind: 'FIELD',
    duelAttributes: ['physicality', 'technique'],
    action: { description: 'Any player playing out of position loses 1 additional point from the duel attribute.', trigger: 'passive' }
  },
  // Técnica
  { name: 'Technique vs Pace',    kind: 'FIELD', duelAttributes: ['technique', 'pace'],      action: undefined },
  { name: 'Technique vs Shooting',kind: 'FIELD', duelAttributes: ['technique', 'finishing'], action: undefined },
  { name: 'Technique vs Overall',    kind: 'FIELD', duelAttributes: ['technique', 'overall'],   action: undefined },
  { name: 'Technique vs Physical',     kind: 'FIELD', duelAttributes: ['technique', 'physicality'],action: undefined },
  { name: 'Technique vs Mental',     kind: 'FIELD', duelAttributes: ['technique', 'mental'],    action: undefined },
  {
    name: 'Technique vs Technique',
    kind: 'FIELD',
    duelAttributes: ['technique', 'technique'],
    action: { description: 'The loser must change their player for the next duel (does not count as a substitution).', trigger: 'duel_loss' }
  },
  {
    name: 'Tackling vs Technique',
    kind: 'FIELD',
    duelAttributes: ['tackle', 'technique'],
    action: { description: 'The winner chooses a card from their opponent’s hand to discard.', trigger: 'duel_win' }
  },
  // Rapidez
  { name: 'Pace vs Tackling',    kind: 'FIELD', duelAttributes: ['pace', 'tackle'],      action: undefined },
  { name: 'Pace vs Shooting',kind: 'FIELD', duelAttributes: ['pace', 'finishing'],   action: undefined },
  { name: 'Pace vs Overall',    kind: 'FIELD', duelAttributes: ['pace', 'overall'],     action: undefined },
  { name: 'Pace vs Physical',     kind: 'FIELD', duelAttributes: ['pace', 'physicality'], action: undefined },
  { name: 'Pace vs Mental',     kind: 'FIELD', duelAttributes: ['pace', 'mental'],      action: undefined },
  { name: 'Pace vs Technique',    kind: 'FIELD', duelAttributes: ['pace', 'technique'],   action: undefined },
  {
    name: 'Pace vs Pace (Change challenge)',
    kind: 'FIELD',
    duelAttributes: ['pace', 'pace'],
    action: { description: 'The winner may replace the challenge card for the next duel.', trigger: 'duel_win' }
  },
  {
    name: 'Pace vs Pace (Substitution)',
    kind: 'FIELD',
    duelAttributes: ['pace', 'pace'],
    action: { description: 'The winner must make a substitution.', trigger: 'duel_win' }
  },
  // Desarme
  { name: 'Tackling vs Shooting',kind: 'FIELD', duelAttributes: ['tackle', 'finishing'],   action: undefined },
  { name: 'Tackling vs Overall',    kind: 'FIELD', duelAttributes: ['tackle', 'overall'],     action: undefined },
  { name: 'Tackling vs Mental',     kind: 'FIELD', duelAttributes: ['tackle', 'mental'],      action: undefined },
  { name: 'Tackling vs Physical',     kind: 'FIELD', duelAttributes: ['tackle', 'physicality'], action: undefined },
  { name: 'Tackling vs Pace',    kind: 'FIELD', duelAttributes: ['tackle', 'pace'],        action: undefined },
  // Mental
  { name: 'Mental vs Pace',    kind: 'FIELD', duelAttributes: ['mental', 'pace'],        action: undefined },
  { name: 'Mental vs Tackling',    kind: 'FIELD', duelAttributes: ['mental', 'tackle'],      action: undefined },
  { name: 'Mental vs Shooting',kind: 'FIELD', duelAttributes: ['mental', 'finishing'],   action: undefined },
  { name: 'Mental vs Overall',    kind: 'FIELD', duelAttributes: ['mental', 'overall'],     action: undefined },
  { name: 'Mental vs Physical',     kind: 'FIELD', duelAttributes: ['mental', 'physicality'], action: undefined },
  { name: 'Mental vs Technique',    kind: 'FIELD', duelAttributes: ['mental', 'technique'],   action: undefined },
  {
    name: 'Mental vs Mental',
    kind: 'FIELD',
    duelAttributes: ['mental', 'mental'],
    action: { description: 'The loser loses the Derby Star token if they hold it.', trigger: 'duel_loss' }
  },
  // Finalização
  { name: 'Shooting vs Pace', kind: 'FIELD', duelAttributes: ['finishing', 'pace'],        action: undefined },
  { name: 'Shooting vs Tackling', kind: 'FIELD', duelAttributes: ['finishing', 'tackle'],      action: undefined },
  { name: 'Shooting vs Shooting', kind: 'FIELD', duelAttributes: ['finishing', 'finishing'], action: undefined },
  { name: 'Shooting vs Overall', kind: 'FIELD', duelAttributes: ['finishing', 'overall'],     action: undefined },
  { name: 'Shooting vs Physical',  kind: 'FIELD', duelAttributes: ['finishing', 'physicality'], action: undefined },
  { name: 'Shooting vs Technique', kind: 'FIELD', duelAttributes: ['finishing', 'technique'],   action: undefined },
  {
    name: 'Shooting vs Mental',
    kind: 'FIELD',
    duelAttributes: ['finishing', 'mental'],
    action: { description: 'Both players draw a special card.', trigger: 'duel_resolved' }
  },
  // Overall
  { name: 'Overall vs Pace',    kind: 'FIELD', duelAttributes: ['overall', 'pace'],        action: undefined },
  { name: 'Overall vs Tackling',    kind: 'FIELD', duelAttributes: ['overall', 'tackle'],      action: undefined },
  { name: 'Overall vs Shooting',kind: 'FIELD', duelAttributes: ['overall', 'finishing'],   action: undefined },
  { name: 'Overall vs Physical',     kind: 'FIELD', duelAttributes: ['overall', 'physicality'], action: undefined },
  { name: 'Overall vs Mental',     kind: 'FIELD', duelAttributes: ['overall', 'mental'],      action: undefined },
  { name: 'Overall vs Technique',    kind: 'FIELD', duelAttributes: ['overall', 'technique'],   action: undefined },
  {
    name: 'Overall vs Pace (Special card)',
    kind: 'FIELD',
    duelAttributes: ['overall', 'pace'],
    action: { description: 'The loser draws a special card.', trigger: 'duel_loss' }
  },
  {
    name: 'Overall vs Overall (Younger player)',
    kind: 'FIELD',
    duelAttributes: ['overall', 'overall'],
    action: { description: 'The younger player gains +1 Overall.', trigger: 'before_duel' }
  },
  {
    name: 'Overall vs Overall',
    kind: 'FIELD',
    duelAttributes: ['overall', 'overall'],
    action: undefined
  }
]

const GOAL_DUELS = [
  // Físico
  { name: 'Physical vs Physical',     kind: 'GOAL', duelAttributes: ['physicality', 'physicality'], action: undefined },
  { name: 'Physical vs Pace',    kind: 'GOAL', duelAttributes: ['physicality', 'pace'],        action: undefined },
  { name: 'Physical vs Shooting',kind: 'GOAL', duelAttributes: ['physicality', 'finishing'],   action: undefined },
  { name: 'Physical vs Technique',    kind: 'GOAL', duelAttributes: ['physicality', 'technique'],   action: undefined },
  { name: 'Physical vs Mental',     kind: 'GOAL', duelAttributes: ['physicality', 'mental'],      action: undefined },
  // Técnica
  { name: 'Technique vs Tackling',   kind: 'GOAL', duelAttributes: ['technique', 'tackle'],        action: undefined },
  { name: 'Technique vs Physical',    kind: 'GOAL', duelAttributes: ['technique', 'physicality'],   action: undefined },
  { name: 'Technique vs Mental',    kind: 'GOAL', duelAttributes: ['technique', 'mental'],        action: undefined },
  { name: 'Technique vs Overall',   kind: 'GOAL', duelAttributes: ['technique', 'overall'],       action: undefined },
  // Saídas (GK)
  { name: 'Exits vs Physical',     kind: 'GOAL', duelAttributes: ['exits', 'physicality'],   action: undefined },
  { name: 'Exits vs Pace',    kind: 'GOAL', duelAttributes: ['exits', 'pace'],          action: undefined },
  { name: 'Exits vs Shooting',kind: 'GOAL', duelAttributes: ['exits', 'finishing'],     action: undefined },
  { name: 'Exits vs Technique',    kind: 'GOAL', duelAttributes: ['exits', 'technique'],     action: undefined },
  { name: 'Exits vs Mental',     kind: 'GOAL', duelAttributes: ['exits', 'mental'],        action: undefined },
  // Jogo de mãos (GK)
  { name: 'Handling vs Physical',     kind: 'GOAL', duelAttributes: ['handling', 'physicality'], action: undefined },
  { name: 'Handling vs Pace',    kind: 'GOAL', duelAttributes: ['handling', 'pace'],        action: undefined },
  { name: 'Handling vs Shooting',kind: 'GOAL', duelAttributes: ['handling', 'finishing'],   action: undefined },
  { name: 'Handling vs Technique',    kind: 'GOAL', duelAttributes: ['handling', 'technique'],   action: undefined },
  { name: 'Handling vs Mental',     kind: 'GOAL', duelAttributes: ['handling', 'mental'],      action: undefined },
  { name: 'Handling vs Overall',    kind: 'GOAL', duelAttributes: ['handling', 'overall'],     action: undefined },
  // Mental
  { name: 'Mental vs Physical',      kind: 'GOAL', duelAttributes: ['mental', 'physicality'], action: undefined },
  { name: 'Mental vs Pace',     kind: 'GOAL', duelAttributes: ['mental', 'pace'],        action: undefined },
  { name: 'Mental vs Shooting', kind: 'GOAL', duelAttributes: ['mental', 'finishing'],   action: undefined },
  { name: 'Mental vs Technique',     kind: 'GOAL', duelAttributes: ['mental', 'technique'],   action: undefined },
  { name: 'Mental vs Mental (1)',  kind: 'GOAL', duelAttributes: ['mental', 'mental'],      action: undefined },
  { name: 'Mental vs Mental (2)',  kind: 'GOAL', duelAttributes: ['mental', 'mental'],      action: undefined },
  // Reflexos (GK)
  { name: 'Reflexes vs Physical',     kind: 'GOAL', duelAttributes: ['reflexes', 'physicality'], action: undefined },
  { name: 'Reflexes vs Pace',    kind: 'GOAL', duelAttributes: ['reflexes', 'pace'],        action: undefined },
  { name: 'Reflexes vs Shooting',kind: 'GOAL', duelAttributes: ['reflexes', 'finishing'],   action: undefined },
  { name: 'Reflexes vs Overall',    kind: 'GOAL', duelAttributes: ['reflexes', 'overall'],     action: undefined },
  {
    name: 'Reflexes vs Technique',
    kind: 'GOAL',
    duelAttributes: ['reflexes', 'technique'],
    action: { description: 'The loser draws a special card.', trigger: 'duel_loss' }
  },
  // Overall
  { name: 'Overall vs Overall (1)',   kind: 'GOAL', duelAttributes: ['overall', 'overall'],   action: undefined },
  { name: 'Overall vs Shooting',   kind: 'GOAL', duelAttributes: ['overall', 'finishing'], action: undefined },
  { name: 'Overall vs Pace',       kind: 'GOAL', duelAttributes: ['overall', 'pace'],      action: undefined },
  { name: 'Overall vs Technique',       kind: 'GOAL', duelAttributes: ['overall', 'technique'], action: undefined },
  {
    name: 'Overall vs Overall (GK advances)',
    kind: 'GOAL',
    duelAttributes: ['overall', 'overall'],
    action: { description: 'If the goalkeeper wins the duel, advance directly to midfield.', trigger: 'duel_win' }
  },
  // Duplicados para completar os 40
  { name: 'Mental vs Physical (2)',      kind: 'GOAL', duelAttributes: ['mental', 'physicality'], action: undefined },
  { name: 'Mental vs Pace (2)',     kind: 'GOAL', duelAttributes: ['mental', 'pace'],        action: undefined },
  { name: 'Mental vs Shooting (2)', kind: 'GOAL', duelAttributes: ['mental', 'finishing'],   action: undefined },
  { name: 'Mental vs Technique (2)',     kind: 'GOAL', duelAttributes: ['mental', 'technique'],   action: undefined }
]


const SPECIALS = [
  {
    name:        'VAR Review',
    description: 'You must use this card the next time you concede a goal. Cancel that goal and return the ball to midfield.',
    trigger:     'on_goal_conceded',
    quantity:    2
  },
  {
    name:        'Long Ball',
    description: 'Move directly to your opponent’s defense at any time during the game. Use before a duel.',
    trigger:     'before_duel',
    quantity:    1
  },
  {
    name:        'National Pride!',
    description: 'For each player of the same nationality on the pitch, your dueling player gains +1 to all attributes.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Change the Challenge',
    description: 'Before the next duel, replace the challenge card. Only you may look at the new card; place it face down.',
    trigger:     'before_duel',
    quantity:    2
  },
  {
    name:        'Attribute Bonus',
    description: 'Add +1 to an attribute of your choice.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Duel Replay',
    description: 'After losing a duel, you may choose to replay it.',
    trigger:     'duel_loss',
    quantity:    1
  },
  {
    name:        'Unexpected Injury',
    description: 'Before the next duel, your opponent must substitute their player.',
    trigger:     'before_duel',
    quantity:    2
  },
  {
    name:        'Transfer Market',
    description: 'Choose any player from your deck.',
    trigger:     'immediate',
    quantity:    2
  },
  {
    name:        'More Options',
    description: 'Draw 2 player cards from your deck into your hand.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Through Ball',
    description: 'Look through the challenge deck and choose a card to place in your attack.',
    trigger:     'before_duel',
    quantity:    1
  },
  {
    name:        'Dirty Play',
    description: 'Take a random card from your opponent’s hand without looking. They may shuffle their hand first.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Dangerous Tackle',
    description: 'In the next duel, your player loses 2 points from the challenge attribute.',
    trigger:     'before_duel',
    quantity:    1
  },
  {
    name:        'One on One',
    description: 'In the next duel, ignore all external modifiers. Only the card’s base values count.',
    trigger:     'before_duel',
    quantity:    2
  },
  {
    name:        'Coach Sent Off',
    description: 'Cancel all of the opposing coach’s abilities.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Goalkeepers Off Form',
    description: 'Both goalkeepers lose 1 point from all attributes.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Rally the Team',
    description: 'In the next duel, your player gains +1 to the challenge attribute.',
    trigger:     'before_duel',
    quantity:    1
  },
  {
    name:        'All-Out Attack',
    description: 'When you lose a challenge in attack, you may play one more challenge in that zone.',
    trigger:     'duel_loss',
    quantity:    1
  },
  {
    name:        'Versatile Team',
    description: 'Your players have no out-of-position penalties for 3 duels.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Park the Bus',
    description: 'When you lose a duel in your defense, you may replay it with a new challenge and the same players.',
    trigger:     'duel_loss',
    quantity:    1
  },
  {
    name:        'Token Theft',
    description: 'Steal the Derby Star token from your opponent. If you already hold it, you may keep this card.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Tactical Knowledge',
    description: 'You may replace a challenge card, but you cannot choose the replacement.',
    trigger:     'before_duel',
    quantity:    2
  },
  {
    name:        'Superior Technique',
    description: 'Your Technique increases by 1 until a duel involving Technique is played.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Midfield Battle',
    description: 'To advance from midfield, you must win two duels. They do not need to be consecutive.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Into Open Space',
    description: 'When you win a duel, you may move play directly to your attacking midfield.',
    trigger:     'duel_win',
    quantity:    1
  }
]


const COACH_ACTIONS = [
      // Coaches
      { trigger: 'game_end',   description: 'You automatically win the game if it ends in a draw.' },
      { trigger: 'game_start', description: 'All players of the same nationality gain +2 Overall.' },
      { trigger: 'on_goal_conceded', description: 'You must lose two consecutive goal duels to concede a goal.' },
      { trigger: 'game_start', description: 'Start the game with one additional special card.' },
      { trigger: 'duel_start', description: 'Attacking duels: +1 to all attributes. Defensive duels: −1 to all attributes.' },
      { trigger: 'duel_start', description: 'Physical duels: +2 points. Technique duels: −1 point.' },
      { trigger: 'immediate',  description: 'You may choose one duel to win automatically.' },
      // Special Cards
      { trigger: 'before_duel', description: 'Before a duel starts, move play directly to your attack.' },
      { trigger: 'before_duel', description: 'In the next duel, your player gains +2 to all attributes.' },
      { trigger: 'immediate',   description: 'The opposing player loses 3 points in the next duel.' },
      { trigger: 'before_duel', description: 'Cancel an opposing player’s ability in this duel.' },
      { trigger: 'before_duel', description: 'Your captain gains +2 to all attributes in this duel.' },
      { trigger: 'before_duel', description: 'Swap two of your players on the pitch before a duel.' },
      { trigger: 'on_goal',     description: 'After scoring a goal, your next player gains +1 to all attributes.' }
    ]


// Original coach nationalities supplied by the user; base abilities unchanged.
const BASE_COACHES = [
 ['José Santos','PT'], ['Mário João','BR'], ['Rafael Passos','PT'],
 ['Emílio Pateiro','ES'], ['Osvaldo Oliva','MX'], ['Nick Role','EN'], ['Martin Callado','AR']
].map(([name,nationality],index)=>({name,nationality,action:COACH_ACTIONS[index]}));

// Nine optional design proposals for the printable edition, not digital-game seeds.
const EXTRA_COACHES = [
 {name:'Luc Morel',nationality:'FR',action:{trigger:'before_duel',description:'Once per game, give your player +2 Pace for one duel.'}},
 {name:'Lukas Weber',nationality:'DE',action:{trigger:'before_duel',description:'Once per game, give your player +2 Mental for one duel.'}},
 {name:'Paolo Rinaldi',nationality:'IT',action:{trigger:'game_start',description:'Start the game with one additional player card in your hand.'}},
 {name:'Daan Vermeer',nationality:'NL',action:{trigger:'duel_loss',description:'Once per game, after losing a field duel, take the Derby Star token.'}},
 {name:'Ivan Kovac',nationality:'HR',action:{trigger:'duel_start',description:'Your captain gains +1 Overall while you hold the Derby Star token.'}},
 {name:'Kenji Sato',nationality:'JP',action:{trigger:'on_goal_conceded',description:'After conceding a goal, draw one player card.'}},
 {name:'Erik Lind',nationality:'SE',action:{trigger:'before_duel',description:'Once per game, swap two of your players on the pitch before a duel.'}},
 {name:'Noah Brooks',nationality:'US',action:{trigger:'duel_win',description:'Once per game, after winning a field duel, draw a special card.'}},
 {name:'Mateo Rojas',nationality:'CL',action:{trigger:'before_duel',description:'Once per game, ignore one player’s out-of-position penalty for one duel.'}}
].map(coach=>({...coach,edition:'printable-expansion'}));
const COACHES = [...BASE_COACHES,...EXTRA_COACHES];
const DUELS = [...FIELD_DUELS,...GOAL_DUELS];
const SPECIAL_CARDS = SPECIALS.flatMap(card => Array.from({length:card.quantity},(_,copy)=>({...card,copy:copy+1})));
export {COACHES, BASE_COACHES, EXTRA_COACHES, DUELS, FIELD_DUELS, GOAL_DUELS, SPECIALS, SPECIAL_CARDS};
