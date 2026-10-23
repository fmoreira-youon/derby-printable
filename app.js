import { DECK1_PLAYERS, DECK2_PLAYERS } from './data/decks.js';
import { gridFor, paginate, reverseSheet, boardTiles } from './layout.js';

const views = {
  blue: { title: 'Default blue deck', route: '/print/decks/blue', players: DECK2_PLAYERS, color: 'blue' },
  red: { title: 'Default red deck', route: '/print/decks/red', players: DECK1_PLAYERS, color: 'red' },
  board: { title: 'The pitch', route: '/print/board' },
  tokens: { title: 'Match tokens', route: '/print/tokens' }
};
const positions = { GOALKEEPER:'Goalkeeper', DEFENSE:'Defense', MIDFIELD:'Midfield', ATTACKING_MIDFIELD:'Attacking midfield', ATTACK:'Attack' };
const flags = { PT:'portugal', IT:'italia', FR:'franca', ES:'espanha', EN:'inglaterra', DE:'alemanha', AR:'argentina', BR:'brasil', US:'eua', MX:'mexico', BE:'belgica', NL:'holanda', CZ:'republica-checa', CL:'chile', CI:'costa-marfim', HR:'croacia', NG:'nigeria' };
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const form = document.querySelector('#options');
const sheets = document.querySelector('#sheets');
const initialSide = new URLSearchParams(location.search).get('side');
if (['front','back'].includes(initialSide)) form.elements.sides.value = initialSide;
let currentView, ready = Promise.resolve(), generation = 0;

function card(player, color, back, rotate) {
  if (!player) return '<div class="card-space"></div>';
  const a = player.attributes;
  const attributes = player.position === 'GOALKEEPER'
    ? [['Physical',a.physicality],['Technique',a.technique],['Handling',a.handling],['Reflexes',a.reflexes],['Mental',a.mental],['Exits',a.exits]]
    : [['Physical',a.physicality],['Technique',a.technique],['Tackling',a.tackle],['Pace',a.pace],['Mental',a.mental],['Finishing',a.finishing]];
  const flag = flags[player.nationality];
  return `<div class="card-space"><article class="playing-card ${color} ${back?'card-back':''} ${rotate?'rotate':''}">
  ${back ? `<div class="back-stripe"></div><div class="back-brand">DERBY<small>FOOTBALL TRADING CARD GAME</small></div><span class="back-team">${color.toUpperCase()} TEAM</span>` : `
  <header><span class="card-number">${escape(player.nationality)} · ${player.age} YEARS</span>${flag?`<img class="flag" src="resources/flags/${flag}.svg" alt="${escape(player.nationality)}">`:''}<h3>${escape(player.name)}</h3><p>${positions[player.position]}</p></header>
  <div class="card-middle"><div class="overall"><span>OVERALL</span><b>${a.overall}</b></div><div class="attributes">${attributes.map(([label,value])=>`<div><span>${label}</span><b>${value}</b></div>`).join('')}</div></div>
  <div class="ability">${escape(player.action?.description || '—')}</div><footer>DERBY <span>${color.toUpperCase()} / ${String(currentView.players.indexOf(player)+1).padStart(2,'0')}</span></footer>`}
  </article></div>`;
}
function page(content, label, paper) {
  return `<section class="sheet ${paper}" aria-label="${escape(label)}"><div class="sheet-label">DERBY / ${escape(label)}</div>${content}<div class="sheet-bottom"><span>${escape(label)}</span><span class="ruler">50 mm</span></div></section>`;
}
function renderDeck(view, options) {
  const {paper,sides,edge} = options, {columns} = gridFor(paper);
  const pages = paginate(view.players,paper);
  return pages.flatMap((players,i) => (sides==='both'?['front','back']:[sides]).map(side => {
    const isBack = side==='back';
    const ordered = isBack ? reverseSheet(players,paper,edge) : players;
    return page(`<div class="card-grid" style="--columns:${columns}">${ordered.map(p=>card(p,view.color,isBack,isBack && edge==='short')).join('')}</div>`,`${view.title} · sheet ${i+1} · ${side}`,paper);
  })).join('');
}
function pitch() {
  const labels = ['Goalkeeper','Defense','Midfield','Attacking midfield','Attack'];
  return `<div class="pitch"><div class="pitch-line"></div><div class="pitch-circle"></div><div class="pitch-brand">DERBY <span>BLUE → &nbsp; MATCH PITCH &nbsp; ← RED</span></div>${labels.map((name,i)=>`<div class="pitch-column" style="left:${10+i*72}mm"><div class="slot red-slot"><span>RED · ${labels[4-i]}</span></div><div class="slot duel-slot"><span>DUEL ${i+1}</span></div><div class="slot blue-slot"><span>BLUE · ${name}</span></div></div>`).join('')}<div class="pitch-end">PRINT & PLAY · 380 × 310 mm</div></div>`;
}
function renderBoard(paper) {
  return boardTiles(paper).map((t,i)=>page(`<div class="tile" style="width:${t.width}mm;height:${t.height}mm"><div class="tile-art" style="left:-${t.x}mm;top:-${t.y}mm">${pitch()}</div></div><p class="assembly">Tile ${i+1} · ${paper==='a4'?'2 × 2 layout: 1 2 / 3 4':'Top / bottom: 1 / 2'} · overlap matching artwork by 10 mm.</p>`,`Pitch · tile ${i+1}`,paper)).join('');
}
function tokenIcon(type) {
  const shapes = {
    star:'<path d="m50 12 11 25 27 3-20 18 6 27-24-14-24 14 6-27-20-18 27-3Z" fill="currentColor"/>',
    ball:'<circle cx="50" cy="50" r="31" fill="white" stroke="currentColor" stroke-width="3"/><path d="m50 34 16 12-6 19H40l-6-19Z M50 19v15 M21 40l13 6 M29 74l11-9 M71 74 60 65 M79 40l-13 6" fill="currentColor" stroke="currentColor" stroke-width="4"/>',
    sub:'<path d="M20 36h55L60 21 M80 64H25l15 15" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${shapes[type]}</svg>`;
}
function renderTokens(paper,subs) {
  const tokens = [{type:'star',label:'DERBY STAR',color:'gold'},{type:'ball',label:'BALL',color:'neutral'},...['blue','red'].flatMap(color=>Array.from({length:subs},(_,i)=>({type:'sub',label:`${color.toUpperCase()} ${i+1}`,color})))];
  const capacity = paper==='a4'?30:60;
  return Array.from({length:Math.ceil(tokens.length/capacity)},(_,i)=>page(`<div class="token-grid">${tokens.slice(i*capacity,(i+1)*capacity).map(t=>`<div class="token-cell"><div class="token ${t.color}">${tokenIcon(t.type)}</div><small>${t.label}</small></div>`).join('')}</div>`,`Tokens · sheet ${i+1}`,paper)).join('');
}
async function assetsReady() {
  await document.fonts.ready;
  await Promise.all([...sheets.querySelectorAll('img')].map(async img=>{ await img.decode(); }));
}
function render() {
  const id = ++generation;
  const path = location.hash.slice(1).replace(/\/$/,'') || '/print';
  currentView = Object.values(views).find(v=>v.route===path);
  const home = path==='/print';
  document.querySelector('#navigation').innerHTML = Object.values(views).map((v,i)=>`<a class="nav-card ${currentView===v?'active':''}" href="#${v.route}" ${currentView===v?'aria-current="page"':''}><span>0${i+1}</span><strong>${v.title}</strong><small>${v.players?`${v.players.length} player cards`:i===2?'Five zones. One match.':'Star, ball & substitutions'}</small></a>`).join('');
  const view = currentView;
  document.querySelector('.workspace').hidden = !view;
  document.querySelector('#error').hidden = true;
  sheets.innerHTML = '';
  if (!view) {
    if (!home) sheets.innerHTML='<p class="empty">Print page not found. Choose a component above.</p>';
    return;
  }
  document.title = `DERBY — ${view.title}`;
  const data = new FormData(form), paper=data.get('paper'), sides=data.get('sides'), edge=data.get('edge');
  const subs = Math.min(30,Math.max(0,Math.floor(Number(data.get('subs')) || 0)));
  document.body.className = `${paper} ${view.players?'deck-view':view===views.board?'board-view':'tokens-view'} ${data.has('marks')?'cut-marks':''}`;
  document.querySelectorAll('.deck-option').forEach(el=>el.hidden=!view.players);
  document.querySelector('.token-option').hidden=view!==views.tokens;
  document.querySelector('#view-title').textContent=view.title;
  document.querySelector('#print-help').textContent=view.players
    ? 'Portrait. For fronts + backs, print double-sided using the selected binding edge. Test the first pair of sheets before printing the full deck. Ability text is preserved in Portuguese from the game data.'
    : view===views.board ? `${paper==='a3'?'A3 landscape · 2 sheets':'A4 portrait · 4 sheets'}. Trim the blank margins, then align the repeated artwork with a 10 mm overlap. Final pitch: 380 × 310 mm. Slots fit 63 × 88 mm cards.`
    : 'Portrait. Print single-sided. Tokens are 25 mm in diameter. Cut the circles and glue to card. The substitution quantity is a printing preference, not a rule limit.';
  const content = view.players ? renderDeck(view,{paper,sides,edge}) : view===views.board ? renderBoard(paper) : renderTokens(paper,subs);
  sheets.innerHTML=content;
  document.querySelector('#status').textContent=`${sheets.children.length} printed pages · ${paper.toUpperCase()} · ${view.players?'63 × 88 mm cards':view===views.board?'Full-size pitch':'25 mm tokens'}`;
  const button = document.querySelector('#print-button'); button.disabled=true;
  document.querySelector('#status').textContent+=' · Preparing artwork…';
  // Named pages keep paper size and orientation in browser-generated PDFs.
  let style=document.querySelector('#page-size');
  if (!style) {style=document.createElement('style');style.id='page-size';document.head.append(style);}
  style.textContent=`@page {size: ${paper==='a3' ? (view===views.board?'A3 landscape':'A3 portrait') : 'A4 portrait'}; margin: 0;}`;
  ready=assetsReady().then(()=>{
    if(id!==generation)return;
    button.disabled=false;
    document.querySelector('#status').textContent=document.querySelector('#status').textContent.replace(' · Preparing artwork…',' · Ready');
  }).catch(()=>{
    if(id!==generation)return;
    const error=document.querySelector('#error');error.hidden=false;error.textContent='An image could not load. Reload the page before printing.';
  });
}
form.addEventListener('change',render);
window.addEventListener('hashchange',render);
document.querySelector('#print-button').addEventListener('click',async()=>{await ready;if(!document.querySelector('#print-button').disabled)window.print();});
render();
