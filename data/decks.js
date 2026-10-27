const DECK1_PLAYERS = [
  {
    name: 'Nicolau Madail', age: 25, nationality: 'PT', position: 'ATTACK',
    attributes: { overall: 14, physicality: 14, technique: 16, pace: 12, tackle: 8, mental: 13, finishing: 17 },
    action: { description: 'If he wins the duel, he may continue to the next duel.', trigger: 'duel_win' }
  },
  {
    name: 'Mario Bellotti', age: 28, nationality: 'IT', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 13, physicality: 11, technique: 18, pace: 13, tackle: 7, mental: 13, finishing: 13 },
    action: { description: 'At the end of the duel, you may choose a specific player from your deck.', trigger: 'after_duel' }
  },
  {
    name: 'Americ Laplace', age: 22, nationality: 'FR', position: 'MIDFIELD',
    attributes: { overall: 14, physicality: 15, technique: 15, pace: 12, tackle: 13, mental: 14, finishing: 12 },
    action: { description: 'He wins the duel if it is tied.', trigger: 'duel_draw' }
  },
  {
    name: 'Johny', age: 29, nationality: 'EN', position: 'DEFENSE',
    attributes: { overall: 13, physicality: 16, technique: 11, pace: 13, tackle: 15, mental: 13, finishing: 8 },
    action: { description: 'Steal a random special card from your opponent.', trigger: 'immediate' }
  },
  {
    name: 'Hans Butter', age: 35, nationality: 'DE', position: 'ATTACK',
    attributes: { overall: 12, physicality: 11, technique: 13, pace: 10, tackle: 6, mental: 15, finishing: 17 },
    action: { description: 'You may replace the challenge card before the duel.', trigger: 'before_duel' }
  },
  {
    name: 'Jurgen Maize', age: 26, nationality: 'DE', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 13, physicality: 8, technique: 17, pace: 12, tackle: 10, mental: 17, finishing: 13 },
    action: { description: 'At the end of the duel, you may choose a specific player from your deck.', trigger: 'after_duel' }
  },
  {
    name: 'Gigi Marino', age: 28, nationality: 'IT', position: 'MIDFIELD',
    attributes: { overall: 15, physicality: 15, technique: 16, pace: 15, tackle: 11, mental: 16, finishing: 14 },
    action: null
  },
  {
    name: 'Ikai Marquesa', age: 29, nationality: 'AR', position: 'DEFENSE',
    attributes: { overall: 14, physicality: 16, technique: 14, pace: 15, tackle: 14, mental: 14, finishing: 11 },
    action: null
  },
  {
    name: 'David Callas', age: 31, nationality: 'ES', position: 'ATTACK',
    attributes: { overall: 13, physicality: 11, technique: 13, pace: 13, tackle: 8, mental: 16, finishing: 19 },
    action: { description: 'If he wins the duel, you may draw a special card.', trigger: 'duel_win' }
  },
  {
    name: 'Marinho', age: 28, nationality: 'BR', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 12, physicality: 10, technique: 17, pace: 15, tackle: 6, mental: 11, finishing: 13 },
    action: null
  },
  {
    name: 'Pedro Barreiro', age: 27, nationality: 'PT', position: 'MIDFIELD',
    attributes: { overall: 14, physicality: 16, technique: 11, pace: 18, tackle: 14, mental: 12, finishing: 11 },
    action: { description: 'The player in front of him gains +1 Overall.', trigger: 'passive' }
  },
  {
    name: 'Tyson Bills', age: 23, nationality: 'US', position: 'DEFENSE',
    attributes: { overall: 12, physicality: 15, technique: 13, pace: 15, tackle: 13, mental: 11, finishing: 7 },
    action: null
  },
  {
    name: 'Andrés Cuccitini', age: 34, nationality: 'AR', position: 'ATTACK',
    attributes: { overall: 18, physicality: 15, technique: 20, pace: 14, tackle: 10, mental: 18, finishing: 19 },
    action: { description: 'If he wins, you may draw a special card.', trigger: 'duel_win' }
  },
  {
    name: 'Jos Olmish', age: 30, nationality: 'DE', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 13, physicality: 13, technique: 15, pace: 13, tackle: 10, mental: 15, finishing: 12 },
    action: null
  },
  {
    name: 'Xavier', age: 34, nationality: 'ES', position: 'MIDFIELD',
    attributes: { overall: 14, physicality: 11, technique: 17, pace: 10, tackle: 12, mental: 16, finishing: 13 },
    action: null
  },
  {
    name: 'Manuel López', age: 28, nationality: 'MX', position: 'DEFENSE',
    attributes: { overall: 12, physicality: 18, technique: 12, pace: 17, tackle: 13, mental: 12, finishing: 6 },
    action: { description: 'If he loses, you may draw a special card.', trigger: 'duel_loss' }
  },
  {
    name: 'Leonardo Peletti', age: 38, nationality: 'IT', position: 'ATTACK',
    attributes: { overall: 11, physicality: 9, technique: 14, pace: 8, tackle: 9, mental: 17, finishing: 17 },
    action: { description: 'Remove your opponent’s special cards (do not steal them).', trigger: 'immediate' }
  },
  {
    name: 'Arsene Mambé', age: 30, nationality: 'FR', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 12, physicality: 12, technique: 15, pace: 12, tackle: 12, mental: 13, finishing: 12 },
    action: null
  },
  {
    name: 'Nandinho', age: 22, nationality: 'BR', position: 'MIDFIELD',
    attributes: { overall: 14, physicality: 15, technique: 13, pace: 14, tackle: 16, mental: 12, finishing: 12 },
    action: null
  },
  {
    name: 'Kel Willtec', age: 29, nationality: 'BE', position: 'DEFENSE',
    attributes: { overall: 12, physicality: 13, technique: 11, pace: 14, tackle: 17, mental: 15, finishing: 7 },
    action: { description: 'Draw a special card before the duel.', trigger: 'before_duel' }
  },
  {
    name: 'Kartz Har Vart', age: 24, nationality: 'NL', position: 'ATTACK',
    attributes: { overall: 14, physicality: 14, technique: 12, pace: 14, tackle: 10, mental: 12, finishing: 15 },
    action: { description: 'Cancel the opposing player’s abilities.', trigger: 'before_duel' }
  },
  {
    name: 'Thorg De Nays', age: 27, nationality: 'BE', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 15, physicality: 14, technique: 17, pace: 13, tackle: 11, mental: 14, finishing: 14 },
    action: null
  },
  {
    name: 'Djaniny', age: 24, nationality: 'CZ', position: 'MIDFIELD',
    attributes: { overall: 12, physicality: 15, technique: 10, pace: 17, tackle: 10, mental: 10, finishing: 11 },
    action: null
  },
  {
    name: 'Kan Kun', age: 28, nationality: 'CL', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 16, technique: 10, exits: 12, handling: 14, mental: 16, reflexes: 12 },
    action: { description: 'If he wins the duel, he gains +1 to all attributes in the next duel.', trigger: 'duel_win' }
  },
  {
    name: 'Arnol Matt', age: 20, nationality: 'EN', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 16, technique: 9, exits: 14, handling: 13, mental: 10, reflexes: 15 },
    action: { description: 'If the defender in front of him is English, he gains +2 Overall.', trigger: 'passive' }
  },
  {
    name: 'Montano', age: 36, nationality: 'BR', position: 'GOALKEEPER',
    attributes: { overall: 12, physicality: 9, technique: 13, exits: 11, handling: 14, mental: 18, reflexes: 10 },
    action: { description: 'If his opponent is aged 30 or under, he gains +1 to the duel attribute.', trigger: 'passive' }
  },
  {
    name: 'Fabian Vastez', age: 25, nationality: 'FR', position: 'GOALKEEPER',
    attributes: { overall: 14, physicality: 15, technique: 14, exits: 14, handling: 11, mental: 14, reflexes: 15 },
    action: null
  },
  {
    name: 'Mandala', age: 29, nationality: 'CI', position: 'GOALKEEPER',
    attributes: { overall: 12, physicality: 16, technique: 7, exits: 12, handling: 14, mental: 10, reflexes: 16 },
    action: { description: 'Once per game, you may cancel a goal conceded.', trigger: 'on_goal_conceded' }
  },
  {
    name: 'Hans Teller', age: 33, nationality: 'DE', position: 'GOALKEEPER',
    attributes: { overall: 14, physicality: 14, technique: 14, exits: 18, handling: 13, mental: 12, reflexes: 16 },
    action: { description: 'If he wins the duel, you may return a substituted player of your choice to your hand.', trigger: 'duel_win' }
  },
  {
    name: 'Moura', age: 18, nationality: 'PT', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 14, technique: 12, exits: 13, handling: 13, mental: 10, reflexes: 14 },
    action: { description: 'If he loses, he must be substituted.', trigger: 'duel_loss' }
  },
  {
    name: 'Mateo', age: 31, nationality: 'IT', position: 'DEFENSE',
    attributes: { overall: 17, physicality: 16, technique: 11, pace: 13, tackle: 15, mental: 13, finishing: 8 },
    action: { description: 'If he loses, your goalkeeper gains +1 in the next duel.', trigger: 'duel_loss' }
  },
  {
    name: 'Lucas Pardo', age: 25, nationality: 'BR', position: 'DEFENSE',
    attributes: { overall: 12, physicality: 15, technique: 16, pace: 16, tackle: 14, mental: 11, finishing: 10 },
    action: { description: 'He loses 1 point from the duel attribute if he has no compatriots on the pitch.', trigger: 'passive' }
  },
  {
    name: 'Marlom', age: 22, nationality: 'BR', position: 'MIDFIELD',
    attributes: { overall: 14, physicality: 16, technique: 11, pace: 13, tackle: 15, mental: 13, finishing: 8 },
    action: { description: 'He may only enter the pitch while his coach holds the Derby Star token.', trigger: 'passive' }
  },
  {
    name: 'Mart Aurs', age: 22, nationality: 'DE', position: 'MIDFIELD',
    attributes: { overall: 17, physicality: 16, technique: 13, pace: 13, tackle: 15, mental: 15, finishing: 12 },
    action: { description: 'He always loses a tied duel.', trigger: 'duel_draw' }
  },
  {
    name: 'Pollo', age: 26, nationality: 'CL', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 16, physicality: 16, technique: 11, pace: 13, tackle: 15, mental: 13, finishing: 15 },
    action: { description: 'He gains +1 to all attributes if the central midfielder is Chilean.', trigger: 'passive' }
  },
  {
    name: 'Gus-tav', age: 29, nationality: 'DE', position: 'ATTACK',
    attributes: { overall: 15, physicality: 12, technique: 11, pace: 14, tackle: 7, mental: 16, finishing: 16 },
    action: null
  }
]

const DECK2_PLAYERS = [
  {
    name: 'Manui', age: 23, nationality: 'PT', position: 'ATTACK',
    attributes: { overall: 13, physicality: 13, technique: 14, pace: 13, tackle: 7, mental: 12, finishing: 15 },
    action: null
  },
  {
    name: 'Bello Tutto', age: 33, nationality: 'IT', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 12, physicality: 9, technique: 17, pace: 9, tackle: 6, mental: 15, finishing: 14 },
    action: null
  },
  {
    name: 'Anto Mann', age: 27, nationality: 'FR', position: 'MIDFIELD',
    attributes: { overall: 15, physicality: 15, technique: 15, pace: 14, tackle: 10, mental: 12, finishing: 14 },
    action: { description: 'He wins the duel if it is tied.', trigger: 'duel_draw' }
  },
  {
    name: 'Martin', age: 23, nationality: 'ES', position: 'DEFENSE',
    attributes: { overall: 13, physicality: 14, technique: 13, pace: 13, tackle: 15, mental: 14, finishing: 6 },
    action: { description: 'He gains +1 if another Spanish player is on the pitch.', trigger: 'passive' }
  },
  {
    name: 'Helguero', age: 19, nationality: 'ES', position: 'ATTACK',
    attributes: { overall: 12, physicality: 14, technique: 14, pace: 14, tackle: 6, mental: 10, finishing: 14 },
    action: { description: 'He loses 1 point if his coach does not hold the token.', trigger: 'passive' }
  },
  {
    name: 'Notto', age: 29, nationality: 'IT', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 12, physicality: 9, technique: 14, pace: 12, tackle: 11, mental: 14, finishing: 14 },
    action: { description: 'If he wins, the opposing coach must discard a card from their hand.', trigger: 'duel_win' }
  },
  {
    name: 'Barett', age: 25, nationality: 'EN', position: 'MIDFIELD',
    attributes: { overall: 13, physicality: 17, technique: 12, pace: 14, tackle: 13, mental: 15, finishing: 11 },
    action: { description: 'Cancel the opposing player’s bonus points.', trigger: 'before_duel' }
  },
  {
    name: 'Ballit', age: 21, nationality: 'US', position: 'DEFENSE',
    attributes: { overall: 14, physicality: 17, technique: 13, pace: 14, tackle: 13, mental: 10, finishing: 8 },
    action: null
  },
  {
    name: 'Caldela', age: 35, nationality: 'MX', position: 'ATTACK',
    attributes: { overall: 12, physicality: 9, technique: 15, pace: 9, tackle: 7, mental: 18, finishing: 16 },
    action: { description: 'If he loses, return him to your hand.', trigger: 'duel_loss' }
  },
  {
    name: 'Roman Ver', age: 26, nationality: 'AR', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 14, physicality: 12, technique: 15, pace: 13, tackle: 9, mental: 13, finishing: 14 },
    action: { description: 'If he wins, draw a special card at the end of the duel.', trigger: 'duel_win' }
  },
  {
    name: 'Pedrinho', age: 20, nationality: 'BR', position: 'MIDFIELD',
    attributes: { overall: 13, physicality: 12, technique: 15, pace: 16, tackle: 13, mental: 8, finishing: 13 },
    action: { description: 'He has no out-of-position penalty in Defense or Attacking Midfield.', trigger: 'passive' }
  },
  {
    name: 'Tomiaso', age: 26, nationality: 'IT', position: 'DEFENSE',
    attributes: { overall: 16, physicality: 17, technique: 6, pace: 14, tackle: 20, mental: 18, finishing: 5 },
    action: { description: 'At the end of the duel, his coach takes the Derby Star token.', trigger: 'after_duel' }
  },
  {
    name: 'Andra Martic', age: 30, nationality: 'HR', position: 'ATTACK',
    attributes: { overall: 11, physicality: 13, technique: 13, pace: 13, tackle: 6, mental: 15, finishing: 15 },
    action: { description: 'He gains +2 when playing alongside his brother Marto Martic.', trigger: 'passive' }
  },
  {
    name: 'Marto Martic', age: 30, nationality: 'HR', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 12, physicality: 15, technique: 15, pace: 13, tackle: 10, mental: 11, finishing: 11 },
    action: { description: 'He gains +2 when playing alongside his brother Andra Martic.', trigger: 'passive' }
  },
  {
    name: 'Vax', age: 22, nationality: 'DE', position: 'MIDFIELD',
    attributes: { overall: 14, physicality: 15, technique: 13, pace: 13, tackle: 12, mental: 14, finishing: 10 },
    action: { description: 'You may replace the duel card before the players are revealed.', trigger: 'before_duel' }
  },
  {
    name: 'Jitaz', age: 22, nationality: 'MX', position: 'DEFENSE',
    attributes: { overall: 12, physicality: 14, technique: 13, pace: 15, tackle: 13, mental: 11, finishing: 6 },
    action: null
  },
  {
    name: 'Larisso', age: 30, nationality: 'CL', position: 'ATTACK',
    attributes: { overall: 13, physicality: 13, technique: 12, pace: 14, tackle: 6, mental: 12, finishing: 14 },
    action: null
  },
  {
    name: 'Gliff', age: 26, nationality: 'EN', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 13, physicality: 15, technique: 14, pace: 11, tackle: 10, mental: 15, finishing: 14 },
    action: null
  },
  {
    name: 'Mandova', age: 24, nationality: 'IT', position: 'MIDFIELD',
    attributes: { overall: 13, physicality: 12, technique: 14, pace: 13, tackle: 16, mental: 14, finishing: 11 },
    action: null
  },
  {
    name: 'Tossard', age: 31, nationality: 'BE', position: 'DEFENSE',
    attributes: { overall: 11, physicality: 13, technique: 13, pace: 12, tackle: 14, mental: 16, finishing: 8 },
    action: null
  },
  {
    name: 'Vimmel', age: 21, nationality: 'NL', position: 'ATTACK',
    attributes: { overall: 13, physicality: 16, technique: 16, pace: 13, tackle: 8, mental: 12, finishing: 13 },
    action: null
  },
  {
    name: 'Otomars', age: 29, nationality: 'NL', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 14, physicality: 14, technique: 16, pace: 16, tackle: 8, mental: 11, finishing: 13 },
    action: { description: 'Draw 2 special cards. Keep one and give the other to your opponent.', trigger: 'immediate' }
  },
  {
    name: 'Obi Manu', age: 26, nationality: 'NG', position: 'MIDFIELD',
    attributes: { overall: 12, physicality: 17, technique: 9, pace: 16, tackle: 9, mental: 10, finishing: 9 },
    action: { description: 'He gains +1 for each African player in play.', trigger: 'passive' }
  },
  {
    name: 'Limo', age: 32, nationality: 'BR', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 12, technique: 14, exits: 10, handling: 16, mental: 15, reflexes: 13 },
    action: { description: 'If he wins, advance to the midfield duel.', trigger: 'duel_win' }
  },
  {
    name: 'Mik', age: 28, nationality: 'HR', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 13, technique: 12, exits: 11, handling: 14, mental: 15, reflexes: 13 },
    action: null
  },
  {
    name: 'Vaio', age: 22, nationality: 'BR', position: 'GOALKEEPER',
    attributes: { overall: 11, physicality: 14, technique: 12, exits: 14, handling: 15, mental: 12, reflexes: 13 },
    action: { description: 'If he is younger than his opponent, he gains +1 to the duel attribute.', trigger: 'passive' }
  },
  {
    name: 'Rafa', age: 29, nationality: 'PT', position: 'GOALKEEPER',
    attributes: { overall: 14, physicality: 15, technique: 14, exits: 14, handling: 11, mental: 14, reflexes: 15 },
    action: null
  },
  {
    name: 'John Sights', age: 24, nationality: 'EN', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 16, technique: 12, exits: 10, handling: 12, mental: 12, reflexes: 13 },
    action: { description: 'If the duel is tied, play moves to midfield.', trigger: 'duel_draw' }
  },
  {
    name: 'Joelinton', age: 28, nationality: 'BR', position: 'GOALKEEPER',
    attributes: { overall: 11, physicality: 11, technique: 9, exits: 12, handling: 12, mental: 8, reflexes: 13 },
    action: null
  },
  {
    name: 'Manolas', age: 20, nationality: 'ES', position: 'GOALKEEPER',
    attributes: { overall: 14, physicality: 14, technique: 14, exits: 14, handling: 14, mental: 14, reflexes: 14 },
    action: null
  },
  {
    name: 'Ron Kaku', age: 25, nationality: 'BE', position: 'DEFENSE',
    attributes: { overall: 14, physicality: 16, technique: 12, pace: 15, tackle: 13, mental: 13, finishing: 10 },
    action: { description: 'When he loses a duel, you may return him to his coach’s hand.', trigger: 'duel_loss' }
  },
  {
    name: 'Joey Anters', age: 31, nationality: 'EN', position: 'DEFENSE',
    attributes: { overall: 13, physicality: 12, technique: 12, pace: 12, tackle: 17, mental: 16, finishing: 6 },
    action: { description: 'Draw a special card when he is revealed in a duel.', trigger: 'on_reveal' }
  },
  {
    name: 'Moors', age: 30, nationality: 'BE', position: 'MIDFIELD',
    attributes: { overall: 15, physicality: 13, technique: 18, pace: 12, tackle: 11, mental: 15, finishing: 12 },
    action: { description: 'Once per game, you may replace the duel card.', trigger: 'before_duel' }
  },
  {
    name: 'Cantano Diez', age: 22, nationality: 'AR', position: 'MIDFIELD',
    attributes: { overall: 13, physicality: 19, technique: 13, pace: 13, tackle: 13, mental: 14, finishing: 5 },
    action: { description: 'While his team is losing, he may remain on the pitch.', trigger: 'passive' }
  },
  {
    name: 'Trincic', age: 33, nationality: 'HR', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 13, physicality: 11, technique: 16, pace: 12, tackle: 12, mental: 15, finishing: 13 },
    action: null
  },
  {
    name: 'Mic Upio', age: 27, nationality: 'NL', position: 'ATTACK',
    attributes: { overall: 12, physicality: 14, technique: 13, pace: 13, tackle: 6, mental: 11, finishing: 14 },
    action: { description: 'He loses 1 point against an opponent of the same nationality.', trigger: 'passive' }
  }
]
export { DECK1_PLAYERS, DECK2_PLAYERS };

