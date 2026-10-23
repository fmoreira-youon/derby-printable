// Snapshot from derby-digital/fase2-game-engine. Keep rule text verbatim.
const FIELD_DUELS = [
  // Físico
  { name: 'Físico vs Rapidez',    kind: 'FIELD', duelAttributes: ['physicality', 'pace'],        action: undefined },
  { name: 'Físico vs Desarme',    kind: 'FIELD', duelAttributes: ['physicality', 'tackle'],      action: undefined },
  { name: 'Físico vs Finalização',kind: 'FIELD', duelAttributes: ['physicality', 'finishing'],   action: undefined },
  { name: 'Físico vs Overall',    kind: 'FIELD', duelAttributes: ['physicality', 'overall'],     action: undefined },
  { name: 'Físico vs Mental',     kind: 'FIELD', duelAttributes: ['physicality', 'mental'],      action: undefined },
  {
    name: 'Físico vs Físico',
    kind: 'FIELD',
    duelAttributes: ['physicality', 'physicality'],
    action: { description: 'Quem ganhar pode tirar uma carta especial', trigger: 'duel_win' }
  },
  {
    name: 'Físico vs Técnica',
    kind: 'FIELD',
    duelAttributes: ['physicality', 'technique'],
    action: { description: 'Se algum dos jogadores estiver a jogar fora da sua posição perde 1 ponto adicional na habilidade', trigger: 'passive' }
  },
  // Técnica
  { name: 'Técnica vs Rapidez',    kind: 'FIELD', duelAttributes: ['technique', 'pace'],      action: undefined },
  { name: 'Técnica vs Finalização',kind: 'FIELD', duelAttributes: ['technique', 'finishing'], action: undefined },
  { name: 'Técnica vs Overall',    kind: 'FIELD', duelAttributes: ['technique', 'overall'],   action: undefined },
  { name: 'Técnica vs Físico',     kind: 'FIELD', duelAttributes: ['technique', 'physicality'],action: undefined },
  { name: 'Técnica vs Mental',     kind: 'FIELD', duelAttributes: ['technique', 'mental'],    action: undefined },
  {
    name: 'Técnica vs Técnica',
    kind: 'FIELD',
    duelAttributes: ['technique', 'technique'],
    action: { description: 'Quem perder tem de trocar o jogador do próximo duelo (não conta como substituição)', trigger: 'duel_loss' }
  },
  {
    name: 'Desarme vs Técnica',
    kind: 'FIELD',
    duelAttributes: ['tackle', 'technique'],
    action: { description: 'O vencedor escolhe uma carta da mão do adversário para descartar', trigger: 'duel_win' }
  },
  // Rapidez
  { name: 'Rapidez vs Desarme',    kind: 'FIELD', duelAttributes: ['pace', 'tackle'],      action: undefined },
  { name: 'Rapidez vs Finalização',kind: 'FIELD', duelAttributes: ['pace', 'finishing'],   action: undefined },
  { name: 'Rapidez vs Overall',    kind: 'FIELD', duelAttributes: ['pace', 'overall'],     action: undefined },
  { name: 'Rapidez vs Físico',     kind: 'FIELD', duelAttributes: ['pace', 'physicality'], action: undefined },
  { name: 'Rapidez vs Mental',     kind: 'FIELD', duelAttributes: ['pace', 'mental'],      action: undefined },
  { name: 'Rapidez vs Técnica',    kind: 'FIELD', duelAttributes: ['pace', 'technique'],   action: undefined },
  {
    name: 'Rapidez vs Rapidez (Troca desafio)',
    kind: 'FIELD',
    duelAttributes: ['pace', 'pace'],
    action: { description: 'Quem ganhar pode escolher trocar o desafio do próximo duelo', trigger: 'duel_win' }
  },
  {
    name: 'Rapidez vs Rapidez (Substituição)',
    kind: 'FIELD',
    duelAttributes: ['pace', 'pace'],
    action: { description: 'Quem ganhar terá de fazer uma substituição', trigger: 'duel_win' }
  },
  // Desarme
  { name: 'Desarme vs Finalização',kind: 'FIELD', duelAttributes: ['tackle', 'finishing'],   action: undefined },
  { name: 'Desarme vs Overall',    kind: 'FIELD', duelAttributes: ['tackle', 'overall'],     action: undefined },
  { name: 'Desarme vs Mental',     kind: 'FIELD', duelAttributes: ['tackle', 'mental'],      action: undefined },
  { name: 'Desarme vs Físico',     kind: 'FIELD', duelAttributes: ['tackle', 'physicality'], action: undefined },
  { name: 'Desarme vs Rapidez',    kind: 'FIELD', duelAttributes: ['tackle', 'pace'],        action: undefined },
  // Mental
  { name: 'Mental vs Rapidez',    kind: 'FIELD', duelAttributes: ['mental', 'pace'],        action: undefined },
  { name: 'Mental vs Desarme',    kind: 'FIELD', duelAttributes: ['mental', 'tackle'],      action: undefined },
  { name: 'Mental vs Finalização',kind: 'FIELD', duelAttributes: ['mental', 'finishing'],   action: undefined },
  { name: 'Mental vs Overall',    kind: 'FIELD', duelAttributes: ['mental', 'overall'],     action: undefined },
  { name: 'Mental vs Físico',     kind: 'FIELD', duelAttributes: ['mental', 'physicality'], action: undefined },
  { name: 'Mental vs Técnica',    kind: 'FIELD', duelAttributes: ['mental', 'technique'],   action: undefined },
  {
    name: 'Mental vs Mental',
    kind: 'FIELD',
    duelAttributes: ['mental', 'mental'],
    action: { description: 'Quem perder perde o token estrela-derby caso possua', trigger: 'duel_loss' }
  },
  // Finalização
  { name: 'Finalização vs Rapidez', kind: 'FIELD', duelAttributes: ['finishing', 'pace'],        action: undefined },
  { name: 'Finalização vs Desarme', kind: 'FIELD', duelAttributes: ['finishing', 'tackle'],      action: undefined },
  { name: 'Finalização vs Finalização', kind: 'FIELD', duelAttributes: ['finishing', 'finishing'], action: undefined },
  { name: 'Finalização vs Overall', kind: 'FIELD', duelAttributes: ['finishing', 'overall'],     action: undefined },
  { name: 'Finalização vs Físico',  kind: 'FIELD', duelAttributes: ['finishing', 'physicality'], action: undefined },
  { name: 'Finalização vs Técnica', kind: 'FIELD', duelAttributes: ['finishing', 'technique'],   action: undefined },
  {
    name: 'Finalização vs Mental',
    kind: 'FIELD',
    duelAttributes: ['finishing', 'mental'],
    action: { description: 'Ambos os jogadores retiram uma carta especial', trigger: 'duel_resolved' }
  },
  // Overall
  { name: 'Overall vs Rapidez',    kind: 'FIELD', duelAttributes: ['overall', 'pace'],        action: undefined },
  { name: 'Overall vs Desarme',    kind: 'FIELD', duelAttributes: ['overall', 'tackle'],      action: undefined },
  { name: 'Overall vs Finalização',kind: 'FIELD', duelAttributes: ['overall', 'finishing'],   action: undefined },
  { name: 'Overall vs Físico',     kind: 'FIELD', duelAttributes: ['overall', 'physicality'], action: undefined },
  { name: 'Overall vs Mental',     kind: 'FIELD', duelAttributes: ['overall', 'mental'],      action: undefined },
  { name: 'Overall vs Técnica',    kind: 'FIELD', duelAttributes: ['overall', 'technique'],   action: undefined },
  {
    name: 'Overall vs Rapidez (Carta especial)',
    kind: 'FIELD',
    duelAttributes: ['overall', 'pace'],
    action: { description: 'O perdedor retira uma carta especial', trigger: 'duel_loss' }
  },
  {
    name: 'Overall vs Overall (Mais novo)',
    kind: 'FIELD',
    duelAttributes: ['overall', 'overall'],
    action: { description: 'O mais novo ganha um ponto de overall', trigger: 'before_duel' }
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
  { name: 'Físico vs Físico',     kind: 'GOAL', duelAttributes: ['physicality', 'physicality'], action: undefined },
  { name: 'Físico vs Rapidez',    kind: 'GOAL', duelAttributes: ['physicality', 'pace'],        action: undefined },
  { name: 'Físico vs Finalização',kind: 'GOAL', duelAttributes: ['physicality', 'finishing'],   action: undefined },
  { name: 'Físico vs Técnica',    kind: 'GOAL', duelAttributes: ['physicality', 'technique'],   action: undefined },
  { name: 'Físico vs Mental',     kind: 'GOAL', duelAttributes: ['physicality', 'mental'],      action: undefined },
  // Técnica
  { name: 'Técnica vs Desarme',   kind: 'GOAL', duelAttributes: ['technique', 'tackle'],        action: undefined },
  { name: 'Técnica vs Físico',    kind: 'GOAL', duelAttributes: ['technique', 'physicality'],   action: undefined },
  { name: 'Técnica vs Mental',    kind: 'GOAL', duelAttributes: ['technique', 'mental'],        action: undefined },
  { name: 'Técnica vs Overall',   kind: 'GOAL', duelAttributes: ['technique', 'overall'],       action: undefined },
  // Saídas (GK)
  { name: 'Saídas vs Físico',     kind: 'GOAL', duelAttributes: ['exits', 'physicality'],   action: undefined },
  { name: 'Saídas vs Rapidez',    kind: 'GOAL', duelAttributes: ['exits', 'pace'],          action: undefined },
  { name: 'Saídas vs Finalização',kind: 'GOAL', duelAttributes: ['exits', 'finishing'],     action: undefined },
  { name: 'Saídas vs Técnica',    kind: 'GOAL', duelAttributes: ['exits', 'technique'],     action: undefined },
  { name: 'Saídas vs Mental',     kind: 'GOAL', duelAttributes: ['exits', 'mental'],        action: undefined },
  // Jogo de mãos (GK)
  { name: 'Jogo de mãos vs Físico',     kind: 'GOAL', duelAttributes: ['handling', 'physicality'], action: undefined },
  { name: 'Jogo de mãos vs Rapidez',    kind: 'GOAL', duelAttributes: ['handling', 'pace'],        action: undefined },
  { name: 'Jogo de mãos vs Finalização',kind: 'GOAL', duelAttributes: ['handling', 'finishing'],   action: undefined },
  { name: 'Jogo de mãos vs Técnica',    kind: 'GOAL', duelAttributes: ['handling', 'technique'],   action: undefined },
  { name: 'Jogo de mãos vs Mental',     kind: 'GOAL', duelAttributes: ['handling', 'mental'],      action: undefined },
  { name: 'Jogo de mãos vs Overall',    kind: 'GOAL', duelAttributes: ['handling', 'overall'],     action: undefined },
  // Mental
  { name: 'Mental vs Físico',      kind: 'GOAL', duelAttributes: ['mental', 'physicality'], action: undefined },
  { name: 'Mental vs Rapidez',     kind: 'GOAL', duelAttributes: ['mental', 'pace'],        action: undefined },
  { name: 'Mental vs Finalização', kind: 'GOAL', duelAttributes: ['mental', 'finishing'],   action: undefined },
  { name: 'Mental vs Técnica',     kind: 'GOAL', duelAttributes: ['mental', 'technique'],   action: undefined },
  { name: 'Mental vs Mental (1)',  kind: 'GOAL', duelAttributes: ['mental', 'mental'],      action: undefined },
  { name: 'Mental vs Mental (2)',  kind: 'GOAL', duelAttributes: ['mental', 'mental'],      action: undefined },
  // Reflexos (GK)
  { name: 'Reflexos vs Físico',     kind: 'GOAL', duelAttributes: ['reflexes', 'physicality'], action: undefined },
  { name: 'Reflexos vs Rapidez',    kind: 'GOAL', duelAttributes: ['reflexes', 'pace'],        action: undefined },
  { name: 'Reflexos vs Finalização',kind: 'GOAL', duelAttributes: ['reflexes', 'finishing'],   action: undefined },
  { name: 'Reflexos vs Overall',    kind: 'GOAL', duelAttributes: ['reflexes', 'overall'],     action: undefined },
  {
    name: 'Reflexos vs Técnica',
    kind: 'GOAL',
    duelAttributes: ['reflexes', 'technique'],
    action: { description: 'O perdedor retira uma carta especial', trigger: 'duel_loss' }
  },
  // Overall
  { name: 'Overall vs Overall (1)',   kind: 'GOAL', duelAttributes: ['overall', 'overall'],   action: undefined },
  { name: 'Overall vs Finalização',   kind: 'GOAL', duelAttributes: ['overall', 'finishing'], action: undefined },
  { name: 'Overall vs Rapidez',       kind: 'GOAL', duelAttributes: ['overall', 'pace'],      action: undefined },
  { name: 'Overall vs Técnica',       kind: 'GOAL', duelAttributes: ['overall', 'technique'], action: undefined },
  {
    name: 'Overall vs Overall (GR avança)',
    kind: 'GOAL',
    duelAttributes: ['overall', 'overall'],
    action: { description: 'Se o guarda-redes ganhar o duelo, segue diretamente para o meio-campo', trigger: 'duel_win' }
  },
  // Duplicados para completar os 40
  { name: 'Mental vs Físico (2)',      kind: 'GOAL', duelAttributes: ['mental', 'physicality'], action: undefined },
  { name: 'Mental vs Rapidez (2)',     kind: 'GOAL', duelAttributes: ['mental', 'pace'],        action: undefined },
  { name: 'Mental vs Finalização (2)', kind: 'GOAL', duelAttributes: ['mental', 'finishing'],   action: undefined },
  { name: 'Mental vs Técnica (2)',     kind: 'GOAL', duelAttributes: ['mental', 'technique'],   action: undefined }
]


const SPECIALS = [
  {
    name:        'Recurso ao VAR',
    description: 'Quando sofreres o próximo golo usa esta carta — anula o golo e a bola retorna ao meio-campo. Tens de usar obrigatoriamente no próximo golo que sofreres.',
    trigger:     'on_goal_conceded',
    quantity:    2
  },
  {
    name:        'Bola Longa',
    description: 'Dá-te a possibilidade de ir diretamente para a defesa adversária a qualquer momento do jogo. Tens de usar antes de algum duelo.',
    trigger:     'before_duel',
    quantity:    1
  },
  {
    name:        'Patriotismo!',
    description: 'Por cada jogador da mesma nacionalidade em campo, o teu jogador do duelo ganha 1 ponto em todas as habilidades.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Troca Carta Desafio',
    description: 'Antes do próximo duelo, troca a carta desafio e apenas tu o poderás ver. Retiram a carta e colocam-na voltada para baixo.',
    trigger:     'before_duel',
    quantity:    2
  },
  {
    name:        'Bónus de Habilidade',
    description: 'Adiciona +1 ponto a uma habilidade à tua escolha.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Repetir Duelo',
    description: 'Após perderes um duelo podes decidir voltar a realizá-lo.',
    trigger:     'duel_loss',
    quantity:    1
  },
  {
    name:        'Lesão Inesperada',
    description: 'Antes do próximo duelo o teu adversário terá de substituir o jogador obrigatoriamente.',
    trigger:     'before_duel',
    quantity:    2
  },
  {
    name:        'Mercado de Transferências',
    description: 'Podes ir ao teu deck e escolher um jogador à tua escolha.',
    trigger:     'immediate',
    quantity:    2
  },
  {
    name:        'Mais Opções',
    description: 'Tira +2 cartas jogador do baralho para a tua mão.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Passe a Rasgar',
    description: 'Podes ver as cartas do deck desafio e escolher uma para colocar no teu ataque.',
    trigger:     'before_duel',
    quantity:    1
  },
  {
    name:        'Jogo Sujo',
    description: 'Podes retirar uma carta da mão do adversário sem veres qual. Ele pode baralhar.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Entrada Perigosa',
    description: 'O teu jogador no próximo duelo perde 2 pontos da habilidade do desafio.',
    trigger:     'before_duel',
    quantity:    1
  },
  {
    name:        'Um para Um',
    description: 'No próximo duelo todos os valores externos são descartados — apenas os valores base da carta são válidos.',
    trigger:     'before_duel',
    quantity:    2
  },
  {
    name:        'Treinador Expulso',
    description: 'Todas as ações do treinador do adversário ficam sem efeito.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Guarda-redes em Baixo',
    description: 'Os dois guarda-redes perdem 1 ponto em todas as características.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Encorajar a Equipa',
    description: 'No próximo duelo o teu jogador tem +1 ponto na habilidade do desafio.',
    trigger:     'before_duel',
    quantity:    1
  },
  {
    name:        'Carne Toda no Assador',
    description: 'Quando perderes um desafio no ataque tens a possibilidade de mais um desafio nesse local.',
    trigger:     'duel_loss',
    quantity:    1
  },
  {
    name:        'Equipa Eclética',
    description: 'Os teus jogadores colocados em posições diferentes não perdem pontuação. Válida durante 3 duelos.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Meteste o Autocarro',
    description: 'Quando perderes um duelo na tua defesa, podes repetir o duelo com outro desafio mas com os mesmos jogadores.',
    trigger:     'duel_loss',
    quantity:    1
  },
  {
    name:        'Roubo do Token',
    description: 'Podes roubar o token estrela-derby ao teu adversário. Caso já possuas o token podes guardar esta carta.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Conhecimento Tático',
    description: 'Podes trocar um desafio, mas não o podes escolher.',
    trigger:     'before_duel',
    quantity:    2
  },
  {
    name:        'Técnica Acima da Média',
    description: 'A tua técnica sobe um ponto. Válida até haver um duelo que envolva a técnica.',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Dureza no Meio-campo',
    description: 'Para avançar do meio-campo é preciso ganhar dois duelos (não precisam de ser seguidos).',
    trigger:     'immediate',
    quantity:    1
  },
  {
    name:        'Bola no Espaço Vazio',
    description: 'Quando ganhares um duelo, podes levar o jogo diretamente para o teu meio-campo ofensivo.',
    trigger:     'duel_win',
    quantity:    1
  }
]


const COACH_ACTIONS = [
      // Coaches
      { trigger: 'game_end',   description: 'Ganha automaticamente o jogo no caso de este acabar empatado.' },
      { trigger: 'game_start', description: 'Todos os jogadores da mesma nacionalidade ganham 2 de overall.' },
      { trigger: 'on_goal_conceded', description: 'Para sofrer golo tem de perder dois duelos seguidos na baliza.' },
      { trigger: 'game_start', description: 'Começa o jogo com uma carta especial adicional.' },
      { trigger: 'duel_start', description: 'Duelos de ataque +1 em todas as habilidades; duelos de defesa -1.' },
      { trigger: 'duel_start', description: 'Duelos físicos +2 pontos; duelos de técnica -1 ponto.' },
      { trigger: 'immediate',  description: 'Pode escolher um duelo para ganhar automaticamente.' },
      // Special Cards
      { trigger: 'before_duel', description: 'Antes de algum duelo começar, o jogo vai diretamente para o teu ataque.' },
      { trigger: 'before_duel', description: 'No próximo duelo, o teu jogador ganha +2 em todas as habilidades.' },
      { trigger: 'immediate',   description: 'O jogador adversário perde -3 no próximo duelo.' },
      { trigger: 'before_duel', description: 'Cancela a ação de um jogador adversário neste duelo.' },
      { trigger: 'before_duel', description: 'O teu capitão ganha +2 em todas as habilidades neste duelo.' },
      { trigger: 'before_duel', description: 'Troca dois dos teus jogadores no tabuleiro antes de um duelo.' },
      { trigger: 'on_goal',     description: 'Após marcar golo, o teu próximo jogador ganha +1 em todas as habilidades.' }
    ]


const COACHES = ["José Santos","Mário João","Rafael Passos","Emílio Pateiro","Osvaldo Oliva","Nick Role","Martin Callado"].map((name,index)=>({name,action:COACH_ACTIONS[index]}));
const DUELS = [...FIELD_DUELS,...GOAL_DUELS];
const SPECIAL_CARDS = SPECIALS.flatMap(card => Array.from({length:card.quantity},(_,copy)=>({...card,copy:copy+1})));
export {COACHES, DUELS, FIELD_DUELS, GOAL_DUELS, SPECIALS, SPECIAL_CARDS};
