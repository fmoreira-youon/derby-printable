import { DECK1_PLAYERS, DECK2_PLAYERS } from './data/decks.js';
import { COACHES, DUELS, SPECIAL_CARDS } from './data/collections.js';
import { logo, tokenArt, matchTokens, tokenOrder, tokenSlots } from './artwork.js';
import { gridFor, paginate, reverseSheet, boardTiles } from './layout.js';

const views = {
  blue: { title: 'Default blue deck', route: '/print/decks/blue', players: DECK2_PLAYERS, color: 'blue' },
  red: { title: 'Default red deck', route: '/print/decks/red', players: DECK1_PLAYERS, color: 'red' },
  board: { title: 'The pitch', route: '/print/board' },
  tokens: { title: 'Match tokens', route: '/print/tokens' },
  coaches: { title: 'Coaches', route: '/print/coaches', cards: COACHES, type:'coach' },
  duels: { title: 'Duels', route: '/print/duels', cards: DUELS, type:'duel' },
  specials: { title: 'Special cards', route: '/print/specials', cards: SPECIAL_CARDS, type:'special' }
};
const positions = { GOALKEEPER:'Goalkeeper', DEFENSE:'Defense', MIDFIELD:'Midfield', ATTACKING_MIDFIELD:'Attacking midfield', ATTACK:'Attack' };
const flags = { PT:'portugal', IT:'italia', FR:'franca', ES:'espanha', EN:'inglaterra', DE:'alemanha', AR:'argentina', BR:'brasil', US:'eua', MX:'mexico', BE:'belgica', NL:'holanda', CZ:'republica-checa', CL:'chile', CI:'costa-marfim', HR:'croacia', NG:'nigeria' };
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const form = document.querySelector('#options');
const sheets = document.querySelector('#sheets');
const initialSide = new URLSearchParams(location.search).get('side');
if (['front','back'].includes(initialSide)) form.elements.sides.value = initialSide;
let playerOptions = {};
let currentView, ready = Promise.resolve(), generation = 0;

function card(player, color, back, rotate) {
  if (!player) return '<div class="card-space"></div>';
  const a = player.attributes;
  const attributes = player.position === 'GOALKEEPER'
    ? [['Physical',a.physicality],['Technique',a.technique],['Handling',a.handling],['Reflexes',a.reflexes],['Mental',a.mental],['Exits',a.exits]]
    : [['Physical',a.physicality],['Technique',a.technique],['Tackling',a.tackle],['Pace',a.pace],['Mental',a.mental],['Shooting',a.finishing]];
  const flag = flags[player.nationality];
  return `<div class="card-space" data-card-id="${escape(player.name)}"><article class="playing-card player-card ${color} ${back?'card-back':''} ${rotate?'rotate':''} ${!back&&playerOptions.background==='stadium'?'stadium':''}">
  ${back ? `<div class="back-stripe"></div><div class="back-brand">${logo()}</div>${playerOptions.deckName?`<span class="back-team">${escape(playerOptions.deckTitle)}</span>`:''}${playerOptions.nationality?`<div class="back-nationality">${flag?`<img src="resources/flags/${flag}.svg" alt="">`:""}<span>${escape(player.nationality)}</span></div>`:""}` : `
  ${playerOptions.background==='stadium'?'<img class="stadium-art" src="resources/stadium.jpg" alt="">':''}<header><span class="card-number">${escape(player.nationality)} · ${player.age} YEARS</span>${flag?`<img class="flag" src="resources/flags/${flag}.svg" alt="${escape(player.nationality)}">`:''}<h3>${escape(player.name)}</h3><p>${positions[player.position]}</p></header>
  <div class="card-middle"><div class="overall"><span>OVERALL</span><b>${a.overall}</b></div><div class="attributes">${attributes.map(([label,value])=>`<div><span>${label}</span><b>${value}</b></div>`).join('')}</div></div>
  <div class="ability ${player.action?'':'no-ability'}">${escape(player.action?.description || '')}</div>`}
  </article></div>`;
}
function page(content, label, paper) {
  return `<section class="sheet ${paper}" aria-label="${escape(label)}"><div class="sheet-label">${logo()}<span>${escape(label)}</span></div>${content}<div class="sheet-bottom"><span>${escape(label)}</span><span class="ruler">50 mm</span></div></section>`;
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
  return `<div class="pitch"><div class="pitch-line"></div><div class="pitch-circle"></div><div class="pitch-brand">${logo()} <span>BLUE → &nbsp; MATCH PITCH &nbsp; ← RED</span></div>${labels.map((name,i)=>`<div class="pitch-column" style="left:${10+i*72}mm"><div class="slot red-slot"><span>${labels[4-i]}</span></div><div class="slot duel-slot"><span>DUEL ${i+1}</span></div><div class="slot blue-slot"><span>${name}</span></div></div>`).join('')}<div class="pitch-end">PRINT & PLAY · 380 × 310 mm</div></div>`;
}
function renderBoard(paper) {
  return boardTiles(paper).map((t,i)=>page(`<div class="tile" style="width:${t.width}mm;height:${t.height}mm"><div class="tile-art" style="left:-${t.x}mm;top:-${t.y}mm">${pitch()}</div></div><p class="assembly">Tile ${i+1} · ${paper==='a4'?'2 × 2 layout: 1 2 / 3 4':'Top / bottom: 1 / 2'} · overlap matching artwork by 10 mm.</p>`,`Pitch · tile ${i+1}`,paper)).join('');
}
function renderTokens(paper,sides,edge) {
  const tokens=tokenSlots(matchTokens());
  return (sides==='both'?['front','back']:[sides]).map(side=>{
    const back=side==='back', ordered=back?tokenOrder(tokens,edge):tokens;
    return page(`<div class="token-grid">${ordered.map(t=>t?`<div class="token-cell ${back&&edge==='short'?'rotate':''}" data-token-id="${t.id}">${tokenArt(t.type,back)}<small>${t.label}</small></div>`:'<div class="token-cell token-empty" aria-hidden="true"></div>').join('')}</div>`,`Tokens · ${side}`,paper);
  }).join('');
}
const attributeNames={physicality:'Physical',technique:'Technique',pace:'Pace',tackle:'Tackling',mental:'Mental',finishing:'Shooting',overall:'Overall',exits:'Exits',handling:'Handling',reflexes:'Reflexes'};
function collectionIcon(type) {
  const shapes = {
    coach:'<rect x="6" y="4" width="20" height="25" rx="3"/><path d="M12 4V2h8v2M11 11h10M11 16h4M18 22l5-5M19 17h4v4"/><circle cx="12" cy="23" r="2"/>',
    field:'<rect x="3" y="6" width="26" height="20" rx="2"/><path d="M16 6v20M3 12h5v8H3M29 12h-5v8h5"/><circle cx="16" cy="16" r="4"/>',
    goal:'<path d="M4 27V8h24v19M4 8l4-4h16l4 4M10 8v19M16 8v19M22 8v19M4 14h24M4 20h24"/>'
  };
  return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[type]||''}</svg>`;
}
function collectionCard(item,type,back,rotate) {
  if(!item) return '<div class="card-space"></div>';
  const kind=type==='duel'?(item.kind==='GOAL'?'goal':'field'):type;
  const label=type==='duel'?`${kind.toUpperCase()} DUEL`:type==='coach'?'COACH':'SPECIAL CARD';
  const action=escape(item.action?.description||item.description||'');
  let body;
  if(back) body=`<div class="collection-back-frame"></div>${type==='coach'?`<div class="back-emblem">${collectionIcon('coach')}</div>`:''}<div class="back-brand">${logo()}</div><span class="back-team">${label}</span>`;
  else {
    const top=`<header class="collection-heading"><p class="category">${label}</p>${type==='special'?'':`<div class="collection-emblem">${collectionIcon(kind)}</div>`}</header>`;
    if(type==='duel') {
      const variant=item.name.match(/\(([^)]+)\)/)?.[1];
      body=`${top}<div class="duel-attributes" aria-label="${escape(item.name)}"><strong>${attributeNames[item.duelAttributes[0]]}</strong><span>VS</span><strong>${attributeNames[item.duelAttributes[1]]}</strong></div>${variant?`<p class="duel-variant">${escape(variant)}</p>`:''}${action?`<div class="collection-action"><span class="action-label">MATCH EFFECT</span><p>${action}</p></div>`:'<div class="duel-no-effect" aria-hidden="true"></div>'}`;
    } else body=`${top}<h3 class="collection-title">${escape(item.name)}</h3><div class="collection-action"><span class="action-label">${type==='coach'?'COACH ABILITY':'CARD EFFECT'}</span><p>${action}</p></div><div class="collection-signature">${logo()}</div>`;
  }
  return `<div class="card-space"><article class="playing-card collection-card ${kind} ${back?'card-back':''} ${rotate?'rotate':''}">${body}</article></div>`;
}
function renderCollection(view,{paper,sides,edge,duelKind}) {
  const cards=view.type==='duel'&&duelKind!=='all'?view.cards.filter(c=>c.kind===duelKind):view.cards;
  const {columns}=gridFor(paper);
  return paginate(cards,paper).flatMap((items,i)=>(sides==='both'?['front','back']:[sides]).map(side=>{
    const back=side==='back',ordered=back?reverseSheet(items,paper,edge):items;
    return page(`<div class="card-grid" style="--columns:${columns}">${ordered.map(c=>collectionCard(c,view.type,back,back&&edge==='short')).join('')}</div>`,`${view.title} · sheet ${i+1} · ${side}`,paper);
  })).join('');
}
async function assetsReady() {
  await document.fonts.ready;
  const images=[...document.querySelectorAll('img')];
  await Promise.all(images.map(img=>new Promise((resolve,reject)=>{
    if(img.complete) { img.naturalWidth ? resolve() : reject(new Error(img.src)); return; }
    img.addEventListener('load',resolve,{once:true});
    img.addEventListener('error',()=>reject(new Error(img.src)),{once:true});
  })));
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
}
function render() {
  const id = ++generation;
  const path = location.hash.slice(1).replace(/\/$/,'') || '/print';
  currentView = Object.values(views).find(v=>v.route===path);
  const home = path==='/print';
  document.querySelector('#navigation').innerHTML = Object.values(views).map((v,i)=>`<a class="nav-card ${currentView===v?'active':''}" href="#${v.route}" ${currentView===v?'aria-current="page"':''}><span>0${i+1}</span><strong>${v.title}</strong><small>${v.players?`${v.players.length} player cards`:v.cards?`${v.cards.length} cards`:v===views.board?'Five zones. One match.':'14 tokens · fronts + backs'}</small></a>`).join('');
  const view = currentView;
  document.querySelector('.workspace').hidden = !view;
  document.querySelector('#error').hidden = true;
  sheets.innerHTML = '';
  if (!view) {
    document.title='DERBY — Print & Play';
    if (!home) sheets.innerHTML='<p class="empty">Print page not found. Choose a component above.</p>';
    return;
  }
  document.title = `DERBY — ${view.title}`;
  const data = new FormData(form), paper=data.get('paper'), sides=data.get('sides'), edge=data.get('edge');
  playerOptions={background:data.get('background'),nationality:data.has('nationality'),deckName:data.has('deckName'),deckTitle:view.title};
  const duplex=view!==views.board;
  const isCards=Boolean(view.players||view.cards);
  const options={paper,sides,edge,duelKind:data.get('duelKind')};
  document.body.className = `${paper} ${isCards?'deck-view':view===views.board?'board-view':'tokens-view'} ${data.has('marks')?'cut-marks':''}`;
  document.querySelectorAll('.duplex-option').forEach(el=>el.hidden=!duplex);
  document.querySelectorAll('.player-option').forEach(el=>el.hidden=!view.players);
  document.querySelector('.duel-option').hidden=view!==views.duels;
  document.querySelector('#view-title').textContent=view.title;
  document.querySelector('#print-help').textContent=isCards
    ? 'Portrait. For fronts + backs, print double-sided using the selected binding edge. Test the first pair of sheets before printing the full deck. Ability text is preserved in Portuguese from the game data.'
    : view===views.board ? `${paper==='a3'?'A3 landscape · 2 sheets':'A4 portrait · 4 sheets'}. Trim the blank margins, then align the repeated artwork with a 10 mm overlap. Final pitch: 380 × 310 mm. Slots fit 63 × 88 mm cards.`
    : 'Portrait. 14 tokens: 10 substitutions, 1 Derby star, 1 ball, 1 blue captain and 1 red captain. Print double-sided with the selected binding. Derby logo on the star front, star on its back; other tokens match on both sides. Test the first sheet before cutting the 25 mm circles.';
  const content = view.players ? renderDeck(view,options) : view.cards ? renderCollection(view,options) : view===views.board ? renderBoard(paper) : renderTokens(paper,sides,edge);
  sheets.innerHTML=content;
  document.querySelector('#status').textContent=`${sheets.children.length} printed pages · ${paper.toUpperCase()} · ${isCards?'63 × 88 mm cards':view===views.board?'Full-size pitch':'25 mm tokens'}`;
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
