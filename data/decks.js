const DECK1_PLAYERS = [
  {
    name: 'Nicolau Madail', age: 25, nationality: 'PT', position: 'ATTACK',
    attributes: { overall: 14, physicality: 14, technique: 16, pace: 12, tackle: 8, mental: 13, finishing: 17 },
    action: { description: 'Se ganhar o duelo pode continuar para o próximo duelo', trigger: 'duel_win' }
  },
  {
    name: 'Mario Bellotti', age: 28, nationality: 'IT', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 13, physicality: 11, technique: 18, pace: 13, tackle: 7, mental: 13, finishing: 13 },
    action: { description: 'No fim do duelo pode escolher um jogador específico do deck', trigger: 'after_duel' }
  },
  {
    name: 'Americ Laplace', age: 22, nationality: 'FR', position: 'MIDFIELD',
    attributes: { overall: 14, physicality: 15, technique: 15, pace: 12, tackle: 13, mental: 14, finishing: 12 },
    action: { description: 'Em caso de empate ganha o duelo', trigger: 'duel_draw' }
  },
  {
    name: 'Johny', age: 29, nationality: 'EN', position: 'DEFENSE',
    attributes: { overall: 13, physicality: 16, technique: 11, pace: 13, tackle: 15, mental: 13, finishing: 8 },
    action: { description: 'Escolhe e rouba uma carta especial do adversário à sorte', trigger: 'immediate' }
  },
  {
    name: 'Hans Butter', age: 35, nationality: 'DE', position: 'ATTACK',
    attributes: { overall: 12, physicality: 11, technique: 13, pace: 10, tackle: 6, mental: 15, finishing: 17 },
    action: { description: 'Pode trocar o desafio antes do duelo', trigger: 'before_duel' }
  },
  {
    name: 'Jurgen Maize', age: 26, nationality: 'DE', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 13, physicality: 8, technique: 17, pace: 12, tackle: 10, mental: 17, finishing: 13 },
    action: { description: 'No fim do duelo pode escolher um jogador específico do deck', trigger: 'after_duel' }
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
    action: { description: 'Se ganhar o duelo pode tirar uma carta especial', trigger: 'duel_win' }
  },
  {
    name: 'Marinho', age: 28, nationality: 'BR', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 12, physicality: 10, technique: 17, pace: 15, tackle: 6, mental: 11, finishing: 13 },
    action: null
  },
  {
    name: 'Pedro Barreiro', age: 27, nationality: 'PT', position: 'MIDFIELD',
    attributes: { overall: 14, physicality: 16, technique: 11, pace: 18, tackle: 14, mental: 12, finishing: 11 },
    action: { description: 'Dá mais um ponto de overall ao jogador à sua frente', trigger: 'passive' }
  },
  {
    name: 'Tyson Bills', age: 23, nationality: 'US', position: 'DEFENSE',
    attributes: { overall: 12, physicality: 15, technique: 13, pace: 15, tackle: 13, mental: 11, finishing: 7 },
    action: null
  },
  {
    name: 'Andrés Cuccitini', age: 34, nationality: 'AR', position: 'ATTACK',
    attributes: { overall: 18, physicality: 15, technique: 20, pace: 14, tackle: 10, mental: 18, finishing: 19 },
    action: { description: 'Se ganhar pode retirar uma carta especial', trigger: 'duel_win' }
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
    action: { description: 'Se perder pode retirar uma carta especial', trigger: 'duel_loss' }
  },
  {
    name: 'Leonardo Peletti', age: 38, nationality: 'IT', position: 'ATTACK',
    attributes: { overall: 11, physicality: 9, technique: 14, pace: 8, tackle: 9, mental: 17, finishing: 17 },
    action: { description: 'Retira as cartas especiais do adversário (não rouba)', trigger: 'immediate' }
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
    action: { description: 'Retira uma carta especial antes do duelo', trigger: 'before_duel' }
  },
  {
    name: 'Kartz Har Vart', age: 24, nationality: 'NL', position: 'ATTACK',
    attributes: { overall: 14, physicality: 14, technique: 12, pace: 14, tackle: 10, mental: 12, finishing: 15 },
    action: { description: 'Anula as ações do jogador oponente', trigger: 'before_duel' }
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
    action: { description: 'Se ganhar o duelo, no seguinte tem +1 em tudo', trigger: 'duel_win' }
  },
  {
    name: 'Arnol Matt', age: 20, nationality: 'EN', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 16, technique: 9, exits: 14, handling: 13, mental: 10, reflexes: 15 },
    action: { description: 'Se o defesa à sua frente for inglês ganha +2 de overall', trigger: 'passive' }
  },
  {
    name: 'Montano', age: 36, nationality: 'BR', position: 'GOALKEEPER',
    attributes: { overall: 12, physicality: 9, technique: 13, exits: 11, handling: 14, mental: 18, reflexes: 10 },
    action: { description: 'Se o oponente tiver 30 ou menos anos ganha +1 na habilidade do duelo', trigger: 'passive' }
  },
  {
    name: 'Fabian Vastez', age: 25, nationality: 'FR', position: 'GOALKEEPER',
    attributes: { overall: 14, physicality: 15, technique: 14, exits: 14, handling: 11, mental: 14, reflexes: 15 },
    action: null
  },
  {
    name: 'Mandala', age: 29, nationality: 'CI', position: 'GOALKEEPER',
    attributes: { overall: 12, physicality: 16, technique: 7, exits: 12, handling: 14, mental: 10, reflexes: 16 },
    action: { description: 'Uma vez por jogo pode anular o golo sofrido', trigger: 'on_goal_conceded' }
  },
  {
    name: 'Hans Teller', age: 33, nationality: 'DE', position: 'GOALKEEPER',
    attributes: { overall: 14, physicality: 14, technique: 14, exits: 18, handling: 13, mental: 12, reflexes: 16 },
    action: { description: 'Se ganhar o duelo pode escolher um jogador dos substituídos para voltar para a mão', trigger: 'duel_win' }
  },
  {
    name: 'Moura', age: 18, nationality: 'PT', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 14, technique: 12, exits: 13, handling: 13, mental: 10, reflexes: 14 },
    action: { description: 'Se perder terá de ser obrigatoriamente substituído', trigger: 'duel_loss' }
  },
  {
    name: 'Mateo', age: 31, nationality: 'IT', position: 'DEFENSE',
    attributes: { overall: 17, physicality: 16, technique: 11, pace: 13, tackle: 15, mental: 13, finishing: 8 },
    action: { description: 'Se perder dá mais um ponto ao guarda-redes no duelo seguinte', trigger: 'duel_loss' }
  },
  {
    name: 'Lucas Pardo', age: 25, nationality: 'BR', position: 'DEFENSE',
    attributes: { overall: 12, physicality: 15, technique: 16, pace: 16, tackle: 14, mental: 11, finishing: 10 },
    action: { description: 'Perde um ponto na habilidade se não tiver nenhum compatriota em campo', trigger: 'passive' }
  },
  {
    name: 'Marlom', age: 22, nationality: 'BR', position: 'MIDFIELD',
    attributes: { overall: 14, physicality: 16, technique: 11, pace: 13, tackle: 15, mental: 13, finishing: 8 },
    action: { description: 'Só pode ser colocado em campo quando o treinador tem o token estrela-derby', trigger: 'passive' }
  },
  {
    name: 'Mart Aurs', age: 22, nationality: 'DE', position: 'MIDFIELD',
    attributes: { overall: 17, physicality: 16, technique: 13, pace: 13, tackle: 15, mental: 15, finishing: 12 },
    action: { description: 'Em caso de empate no duelo perde sempre', trigger: 'duel_draw' }
  },
  {
    name: 'Pollo', age: 26, nationality: 'CL', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 16, physicality: 16, technique: 11, pace: 13, tackle: 15, mental: 13, finishing: 15 },
    action: { description: 'Ganha +1 em todas as habilidades se o médio centro for chileno', trigger: 'passive' }
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
    action: { description: 'Em caso de empate ganha o duelo', trigger: 'duel_draw' }
  },
  {
    name: 'Martin', age: 23, nationality: 'ES', position: 'DEFENSE',
    attributes: { overall: 13, physicality: 14, technique: 13, pace: 13, tackle: 15, mental: 14, finishing: 6 },
    action: { description: 'Se tiver mais um espanhol em campo ganha +1', trigger: 'passive' }
  },
  {
    name: 'Helguero', age: 19, nationality: 'ES', position: 'ATTACK',
    attributes: { overall: 12, physicality: 14, technique: 14, pace: 14, tackle: 6, mental: 10, finishing: 14 },
    action: { description: 'Se o treinador não tiver o token, perde 1 ponto', trigger: 'passive' }
  },
  {
    name: 'Notto', age: 29, nationality: 'IT', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 12, physicality: 9, technique: 14, pace: 12, tackle: 11, mental: 14, finishing: 14 },
    action: { description: 'Se ganhar, o treinador adversário terá de descartar uma carta da mão', trigger: 'duel_win' }
  },
  {
    name: 'Barett', age: 25, nationality: 'EN', position: 'MIDFIELD',
    attributes: { overall: 13, physicality: 17, technique: 12, pace: 14, tackle: 13, mental: 15, finishing: 11 },
    action: { description: 'Anula os pontos adicionais do oponente', trigger: 'before_duel' }
  },
  {
    name: 'Ballit', age: 21, nationality: 'US', position: 'DEFENSE',
    attributes: { overall: 14, physicality: 17, technique: 13, pace: 14, tackle: 13, mental: 10, finishing: 8 },
    action: null
  },
  {
    name: 'Caldela', age: 35, nationality: 'MX', position: 'ATTACK',
    attributes: { overall: 12, physicality: 9, technique: 15, pace: 9, tackle: 7, mental: 18, finishing: 16 },
    action: { description: 'Se perder volta para a mão do jogador', trigger: 'duel_loss' }
  },
  {
    name: 'Roman Ver', age: 26, nationality: 'AR', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 14, physicality: 12, technique: 15, pace: 13, tackle: 9, mental: 13, finishing: 14 },
    action: { description: 'Se ganhar, retira uma carta especial no final do duelo', trigger: 'duel_win' }
  },
  {
    name: 'Pedrinho', age: 20, nationality: 'BR', position: 'MIDFIELD',
    attributes: { overall: 13, physicality: 12, technique: 15, pace: 16, tackle: 13, mental: 8, finishing: 13 },
    action: { description: 'Fora da posição, não perde pontos (apenas na Defesa e Médio Ofensivo)', trigger: 'passive' }
  },
  {
    name: 'Tomiaso', age: 26, nationality: 'IT', position: 'DEFENSE',
    attributes: { overall: 16, physicality: 17, technique: 6, pace: 14, tackle: 20, mental: 18, finishing: 5 },
    action: { description: 'No fim do duelo o token estrela-derby vem para o seu treinador', trigger: 'after_duel' }
  },
  {
    name: 'Andra Martic', age: 30, nationality: 'HR', position: 'ATTACK',
    attributes: { overall: 11, physicality: 13, technique: 13, pace: 13, tackle: 6, mental: 15, finishing: 15 },
    action: { description: 'Se estiver a jogar com o irmão Marto Martic ganha +2', trigger: 'passive' }
  },
  {
    name: 'Marto Martic', age: 30, nationality: 'HR', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 12, physicality: 15, technique: 15, pace: 13, tackle: 10, mental: 11, finishing: 11 },
    action: { description: 'Se estiver a jogar com o irmão Andra Martic ganha +2', trigger: 'passive' }
  },
  {
    name: 'Vax', age: 22, nationality: 'DE', position: 'MIDFIELD',
    attributes: { overall: 14, physicality: 15, technique: 13, pace: 13, tackle: 12, mental: 14, finishing: 10 },
    action: { description: 'Pode trocar o duelo antes de serem revelados os jogadores', trigger: 'before_duel' }
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
    action: { description: 'Pega em 2 cartas especiais e terá de escolher uma para si e outra para o oponente', trigger: 'immediate' }
  },
  {
    name: 'Obi Manu', age: 26, nationality: 'NG', position: 'MIDFIELD',
    attributes: { overall: 12, physicality: 17, technique: 9, pace: 16, tackle: 9, mental: 10, finishing: 9 },
    action: { description: 'Ganha +1 por cada jogador africano em jogo', trigger: 'passive' }
  },
  {
    name: 'Limo', age: 32, nationality: 'BR', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 12, technique: 14, exits: 10, handling: 16, mental: 15, reflexes: 13 },
    action: { description: 'Se ganhar, segue para o duelo do meio-campo', trigger: 'duel_win' }
  },
  {
    name: 'Mik', age: 28, nationality: 'HR', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 13, technique: 12, exits: 11, handling: 14, mental: 15, reflexes: 13 },
    action: null
  },
  {
    name: 'Vaio', age: 22, nationality: 'BR', position: 'GOALKEEPER',
    attributes: { overall: 11, physicality: 14, technique: 12, exits: 14, handling: 15, mental: 12, reflexes: 13 },
    action: { description: 'Se for mais novo que o adversário tem +1 na habilidade do duelo', trigger: 'passive' }
  },
  {
    name: 'Rafa', age: 29, nationality: 'PT', position: 'GOALKEEPER',
    attributes: { overall: 14, physicality: 15, technique: 14, exits: 14, handling: 11, mental: 14, reflexes: 15 },
    action: null
  },
  {
    name: 'John Sights', age: 24, nationality: 'EN', position: 'GOALKEEPER',
    attributes: { overall: 13, physicality: 16, technique: 12, exits: 10, handling: 12, mental: 12, reflexes: 13 },
    action: { description: 'Em caso de empate no duelo, jogo segue para o meio-campo', trigger: 'duel_draw' }
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
    action: { description: 'Quando perde um duelo pode voltar para a mão do treinador', trigger: 'duel_loss' }
  },
  {
    name: 'Joey Anters', age: 31, nationality: 'EN', position: 'DEFENSE',
    attributes: { overall: 13, physicality: 12, technique: 12, pace: 12, tackle: 17, mental: 16, finishing: 6 },
    action: { description: 'Retira uma carta especial quando é revelado no duelo', trigger: 'on_reveal' }
  },
  {
    name: 'Moors', age: 30, nationality: 'BE', position: 'MIDFIELD',
    attributes: { overall: 15, physicality: 13, technique: 18, pace: 12, tackle: 11, mental: 15, finishing: 12 },
    action: { description: 'Pode trocar o duelo uma vez por jogo', trigger: 'before_duel' }
  },
  {
    name: 'Cantano Diez', age: 22, nationality: 'AR', position: 'MIDFIELD',
    attributes: { overall: 13, physicality: 19, technique: 13, pace: 13, tackle: 13, mental: 14, finishing: 5 },
    action: { description: 'Se a equipa estiver a perder pode manter-se sempre em campo', trigger: 'passive' }
  },
  {
    name: 'Trincic', age: 33, nationality: 'HR', position: 'ATTACKING_MIDFIELD',
    attributes: { overall: 13, physicality: 11, technique: 16, pace: 12, tackle: 12, mental: 15, finishing: 13 },
    action: null
  },
  {
    name: 'Mic Upio', age: 27, nationality: 'NL', position: 'ATTACK',
    attributes: { overall: 12, physicality: 14, technique: 13, pace: 13, tackle: 6, mental: 11, finishing: 14 },
    action: { description: 'Contra um oponente da mesma nacionalidade perde 1 ponto', trigger: 'passive' }
  }
]
export { DECK1_PLAYERS, DECK2_PLAYERS };

