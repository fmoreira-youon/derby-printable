import { translate, triggerLabel } from './data/locales.js';
import { DECK1_PLAYERS, DECK2_PLAYERS } from './data/decks.js';
import { COACHES, DUELS, SPECIAL_CARDS } from './data/collections.js';
import { logo, tokenArt, tokenOrder, tokenGridFor, fillTokenSheet } from './artwork.js';
import { gridFor, paginate, reverseSheet, boardTiles, boardGeometry } from './layout.js';

const views = {
  all: { title: 'Print everything', route: '/print/all' },
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
Object.assign(flags,{AU:'australia',AT:'austria',CA:'canada',CN:'china',CO:'colombia',DK:'dinamarca',EG:'egito',FI:'finlandia',GR:'grecia',IS:'islandia',JP:'japao',KR:'coreia-sul',LU:'luxemburgo',MA:'marrocos',NO:'noruega',PL:'polonia',RO:'romenia',RU:'russia',SC:'escocia',RS:'servia',SE:'suecia',CH:'suica',UA:'ucrania',UY:'uruguai',WA:'gales'});
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const form = document.querySelector('#options');
const coachStorageKey = 'derby-print-coach-nationalities-v2';
let savedNationalities = {};
try { savedNationalities = JSON.parse(localStorage.getItem(coachStorageKey) || '{}') || {}; } catch {}
const countryNames = new Intl.DisplayNames(['en'],{type:'region'});
const countryName = code => ({EN:'England',SC:'Scotland',WA:'Wales'}[code] || countryNames.of(code));
const countries = Object.keys(flags).sort((a,b)=>countryName(a).localeCompare(countryName(b)));
document.querySelector('#coach-nationalities').innerHTML = COACHES.map((coach,index)=>`<label>${escape(coach.name)}<select name="coach-nationality-${index}" data-coach-name="${escape(coach.name)}"><option value="">Not assigned</option>${countries.map(code=>`<option value="${code}" ${(Object.hasOwn(savedNationalities,coach.name)?savedNationalities[coach.name]:coach.nationality)===code?'selected':''}>${escape(countryName(code))} · ${code}</option>`).join('')}</select></label>`).join('');
const sheets = document.querySelector('#sheets');
const initialSide = new URLSearchParams(location.search).get('side');
if (['front','back'].includes(initialSide)) form.elements.sides.value = initialSide;
let language = 'en';
const tr = text => translate(text, language);
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
  ${back ? `<div class="back-stripe"></div><div class="back-brand">${logo()}</div>${playerOptions.deckName?`<span class="back-team">${escape(tr(playerOptions.deckTitle))}</span>`:''}${playerOptions.nationality?`<div class="back-nationality">${flag?`<img src="resources/flags/${flag}.svg" alt="">`:""}<span>${escape(player.nationality)}</span></div>`:""}` : `
  ${playerOptions.background==='stadium'?'<img class="stadium-art" src="resources/stadium.jpg" alt="">':''}<header><span class="card-number">${escape(player.nationality)} · ${player.age} ${tr('YEARS')}</span>${flag?`<img class="flag" src="resources/flags/${flag}.svg" alt="${escape(player.nationality)}">`:''}<h3>${escape(player.name)}</h3><p>${tr(positions[player.position])}</p></header>
  <div class="card-middle"><div class="overall"><span>${tr('OVERALL')}</span><b>${a.overall}</b></div><div class="attributes">${attributes.map(([label,value])=>`<div><span>${tr(label)}</span><b>${value}</b></div>`).join('')}</div></div>
  <div class="ability ${player.action?'':'no-ability'}">${escape(tr(player.action?.description || ''))}</div>`}
  </article></div>`;
}
function page(content, label, paper, kind = 'card') {
  label = label.split(' · ').map(part => tr(part).replace(/\b(sheet|tile)\b/g, word=>tr(word))).join(' · ');
  return `<section class="sheet ${paper} ${kind.split(' ').map(part=>`${part}-sheet`).join(' ')}" aria-label="${escape(label)}"><div class="sheet-label">${logo()}<span>${escape(label)}</span></div>${content}<div class="sheet-bottom"><span>${escape(label)}</span><span class="ruler">50 mm</span></div></section>`;
}
function renderDeck(view, options) {
  playerOptions.deckTitle = view.title;
  const {paper,sides,edge} = options, {columns} = gridFor(paper);
  const pages = paginate(view.players,paper);
  return pages.flatMap((players,i) => (sides==='both'?['front','back']:[sides]).map(side => {
    const isBack = side==='back';
    const ordered = isBack ? reverseSheet(players,paper,edge) : players;
    return page(`<div class="card-grid" style="--columns:${columns}">${ordered.map(p=>card(p,view.color,isBack,isBack && edge==='short')).join('')}</div>`,`${tr(view.title)} · sheet ${i+1} · ${side}`,paper);
  })).join('');
}
function pileSlot(label) {
  return `<div class="bench-pile-slot" data-pile="${label}"><span>${tr(label)}</span></div>`;
}
function bench(side, top, benches, piles) {
  const coach=benches?`<div class="bench-coach-slot"><span>${tr('COACH')}</span></div>`:'';
  const decks=piles?pileSlot('PLAYER DECK')+(side==='red'?pileSlot('FIELD DUELS')+pileSlot('GOAL DUELS'):pileSlot('SPECIAL CARDS')):'';
  const tokens=benches?`<div class="bench-reserves"><p>${tr('SUBSTITUTIONS')}</p><div class="bench-token-row">${Array.from({length:5},(_,i)=>`<div class="bench-token-slot"><span>${i+1}</span></div>`).join('')}</div></div>`:'';
  return `<div class="coach-bench ${side}-bench ${piles?'':'without-piles'}" style="top:${top}mm"><div class="bench-card-group">${coach}${decks}</div>${tokens}</div>`;
}
function pitchMarkings(height) {
  const cy=height/2;
  return `<svg class="pitch-markings" viewBox="0 0 380 ${height}" aria-hidden="true" fill="none" stroke="currentColor" stroke-width=".45">
    <rect x="8" y="8" width="364" height="${height-16}"/><path class="halfway-line" d="M190 8V${height-8}"/>
    <circle cx="190" cy="${cy}" r="31"/><g fill="currentColor" stroke="none"><circle cx="190" cy="${cy}" r=".9"/><circle cx="39" cy="${cy}" r=".8"/><circle cx="341" cy="${cy}" r=".8"/></g>
    <path class="penalty-areas" d="M8 ${cy-48}h44v96H8M372 ${cy-48}h-44v96h44"/>
    <path class="goal-areas" d="M8 ${cy-25}h17v50H8M372 ${cy-25}h-17v50h17"/>
    <path class="penalty-arcs" d="M52 ${cy-28}a31 31 0 0 1 0 56M328 ${cy-28}a31 31 0 0 0 0 56"/>
    <path class="goals" d="M8 ${cy-12}H3v24h5M372 ${cy-12}h5v24h-5"/>
    <path class="corner-arcs" d="M8 13a5 5 0 0 0 5-5M367 8a5 5 0 0 0 5 5M8 ${height-13}a5 5 0 0 1 5 5M367 ${height-8}a5 5 0 0 1 5-5"/>
  </svg>`;
}
function pitch(benches = false, piles = false) {
  const labels = ['Goalkeeper','Defense','Midfield','Attacking midfield','Attack'];
  const {height,fieldTop,fieldHeight}=boardGeometry(benches,piles);
  const expanded=benches||piles;
  return `<div class="pitch ${expanded?'expanded-pitch':''}" style="height:${height}mm"><div class="pitch-field" style="top:${fieldTop}mm;height:${fieldHeight}mm">${pitchMarkings(fieldHeight)}<div class="pitch-watermark">${logo()}</div>${labels.map((name,i)=>`<div class="pitch-column" style="left:${10+i*72}mm"><div class="slot red-slot"><span>${tr(labels[4-i])}</span></div><div class="slot duel-slot"><span>${tr('DUEL')} ${i+1}</span></div><div class="slot blue-slot"><span>${tr(name)}</span></div></div>`).join('')}</div>${expanded?bench('red',0,benches,piles)+bench('blue',height-fieldTop,benches,piles):''}</div>`;
}
function renderBoard(paper, duplex = false) {
  const benches=form.elements.benches.checked, piles=form.elements.piles.checked;
  return boardTiles(paper,benches,piles).flatMap((t,i)=>[page(`<div class="tile" style="width:${t.width}mm;height:${t.height}mm"><div class="tile-art" style="left:-${t.x}mm;top:-${t.y}mm">${pitch(benches,piles)}</div></div><p class="assembly">${tr('tile')} ${i+1} · ${tr(paper==='a4'?'2 × 2 layout: 1 2 / 3 4':'Top / bottom: 1 / 2')} · ${tr('overlap matching artwork by 10 mm.')}</p>`,`Pitch · tile ${i+1}`,paper,'board'), ...(duplex ? [page('',`Pitch · tile ${i+1} · blank reverse`,paper,'board blank')] : [])]).join('');
}
function renderTokens(paper,sides,edge) {
  const tokens=fillTokenSheet(paper), {columns,rows}=tokenGridFor(paper);
  return (sides==='both'?['front','back']:[sides]).map(side=>{
    const back=side==='back', ordered=back?tokenOrder(tokens,edge,columns):tokens;
    return page(`<div class="token-grid" style="--token-columns:${columns};--token-rows:${rows}">${ordered.map(t=>t?`<div class="token-cell ${back&&edge==='short'?'rotate':''}" data-token-id="${t.id}">${tokenArt(t.type,back)}<small>${tr(t.label)}</small></div>`:'<div class="token-cell token-empty" aria-hidden="true"></div>').join('')}</div>`,`Tokens · ${side}`,paper,'tokens');
  }).join('');
}
const attributeNames={physicality:'Physical',technique:'Technique',pace:'Pace',tackle:'Tackling',mental:'Mental',finishing:'Shooting',overall:'Overall',exits:'Exits',handling:'Handling',reflexes:'Reflexes'};
function collectionIcon(type) {
  if(type==='goal') return '<img class="goal-icon" src="resources/goal.svg" alt="">';
  const shapes = {
    coach:'<rect x="6" y="4" width="20" height="25" rx="3"/><path d="M12 4V2h8v2M11 11h10M11 16h4M18 22l5-5M19 17h4v4"/><circle cx="12" cy="23" r="2"/>',
    field:'<rect x="3" y="6" width="26" height="20" rx="2"/><path d="M16 6v20M3 12h5v8H3M29 12h-5v8h5"/><circle cx="16" cy="16" r="4"/>',
    goal:'<path d="M3 27V10h22v17M3 10l4-5h22v17l-4 5M25 10l4-5" stroke-width="2"/><path d="M7 10v15M12 10v15M17 10v15M21 10v15M4 15h20M4 20h20M7 5v4M12 5v4M17 5v4M22 5v4M26 8h2M26 13h2M26 18h2" stroke-width=".8" opacity=".6"/><path d="M1 28h29"/>'
  };
  return `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[type]||''}</svg>`;
}
function collectionCard(item,type,back,rotate) {
  if(!item) return '<div class="card-space"></div>';
  const kind=type==='duel'?(item.kind==='GOAL'?'goal':'field'):type;
  const label=type==='duel'?`${kind.toUpperCase()} DUEL`:type==='coach'?'COACH':'SPECIAL CARD';
  const action=escape(tr(item.action?.description||item.description||''));
  let body;
  if(back) body=`<div class="collection-back-frame"></div>${type==='coach'?`<div class="back-emblem">${collectionIcon('coach')}</div>`:''}<div class="back-brand">${logo()}</div><span class="back-team">${tr(label)}</span>`;
  else {
    const coachIndex=type==='coach'?COACHES.indexOf(item):-1;
    const nationality=coachIndex>=0 ? form.elements.namedItem(`coach-nationality-${coachIndex}`).value : '';
    const coachNationality=nationality&&flags[nationality]?`<div class="coach-nationality"><span>${escape(nationality)}</span><img class="flag" src="resources/flags/${flags[nationality]}.svg" alt="${escape(countryName(nationality))}"></div>`:'';
    const top=`<header class="collection-heading"><p class="category">${tr(label)}</p>${type==='special'?'':coachNationality||`<div class="collection-emblem">${collectionIcon(kind)}</div>`}</header>`;
    if(type==='duel') {
      body=`${top}<div class="duel-attributes" aria-label="${escape(tr(item.name))}"><strong>${tr(attributeNames[item.duelAttributes[0]])}</strong><span>VS</span><strong>${tr(attributeNames[item.duelAttributes[1]])}</strong></div>${action?`<div class="collection-action"><span class="action-label">${escape(triggerLabel(item.action?.trigger,language))}</span><p>${action}</p></div>`:'<div class="duel-no-effect" aria-hidden="true"></div>'}`;
    } else body=`${top}<h3 class="collection-title">${escape(tr(item.name))}</h3><div class="collection-action"><span class="action-label">${type==='coach'?tr('COACH ABILITY'):escape(triggerLabel(item.trigger||item.action?.trigger,language))}</span><p>${action}</p></div><div class="collection-signature">${logo()}</div>`;
  }
  return `<div class="card-space"><article class="playing-card collection-card ${kind} ${back?'card-back':''} ${rotate?'rotate':''}">${body}</article></div>`;
}
function renderCollection(view,{paper,sides,edge,duelKind}) {
  const cards=view.type==='duel'&&duelKind!=='all'?view.cards.filter(c=>c.kind===duelKind):view.cards;
  const {columns}=gridFor(paper);
  return paginate(cards,paper).flatMap((items,i)=>(sides==='both'?['front','back']:[sides]).map(side=>{
    const back=side==='back',ordered=back?reverseSheet(items,paper,edge):items;
    return page(`<div class="card-grid" style="--columns:${columns}">${ordered.map(c=>collectionCard(c,view.type,back,back&&edge==='short')).join('')}</div>`,`${tr(view.title)} · sheet ${i+1} · ${side}`,paper);
  })).join('');
}
function renderAll(options) {
  // Each component ends on a full front/back pair. Pitch tiles need blank
  // reverses so two different tiles never end up on the same physical sheet.
  const components = [views.blue, views.red, views.coaches, views.duels, views.specials];
  return components.map(view => view.players ? renderDeck(view, options) : renderCollection(view, {...options,duelKind:'all'})).join('')
    + renderTokens(options.paper,options.sides,options.edge)
    + (options.sides==='back' ? '' : renderBoard(options.paper,options.sides==='both'));
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
  document.querySelector('#navigation').innerHTML = Object.values(views).map((v,i)=>`<a class="nav-card ${currentView===v?'active':''}" href="#${v.route}" ${currentView===v?'aria-current="page"':''}><span>0${i+1}</span><strong>${v.title}</strong><small>${v.players?`${v.players.length} player cards`:v.cards?`${v.cards.length} cards`:v===views.all?'Both decks, all cards, tokens + pitch':v===views.board?'Five zones. One match.':'Full token sheets · spares included'}</small></a>`).join('');
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
  const data = new FormData(form);
  language = data.get('language') === 'pt' ? 'pt' : 'en';
  const paper=data.get('paper'), sides=data.get('sides'), edge=data.get('edge');
  playerOptions={background:data.get('background'),nationality:data.has('nationality'),deckName:data.has('deckName'),deckTitle:view.title};
  const all=view===views.all;
  const duplex=view!==views.board;
  const isCards=Boolean(view.players||view.cards);
  document.querySelector('#coach-settings').hidden=!(all||view===views.coaches);
  const options={paper,sides,edge,duelKind:data.get('duelKind')};
  document.body.className = `${paper} ${all?'all-view':isCards?'deck-view':view===views.board?'board-view':'tokens-view'} ${data.has('marks')?'cut-marks':''}`;
  document.querySelectorAll('.duplex-option').forEach(el=>el.hidden=!duplex);
  document.querySelectorAll('.player-option').forEach(el=>el.hidden=!(view.players||all));
  document.querySelector('.duel-option').hidden=view!==views.duels;
  document.querySelectorAll('.board-option').forEach(el=>el.hidden=!(all||view===views.board));
  document.querySelector('#view-title').textContent=view.title;
  document.querySelector('#print-help').textContent=all
    ? 'Complete kit: both player decks, all coaches, field and goal duels, special cards, a full token sheet with spares and the pitch. Fronts + backs includes blank pitch reverses for duplex printing. Backs only omits the pitch. A3 uses portrait card sheets and landscape pitch tiles: save as PDF to preserve mixed orientations, then print at actual size. Card text uses the selected print language.'
    : isCards
    ? 'Portrait. For fronts + backs, print double-sided using the selected binding edge. Test the first pair of sheets before printing the full deck. Card text uses the selected print language.'
    : view===views.board ? `${paper==='a3'?'A3 landscape · 2 sheets':'A4 portrait · 4 sheets'}. Trim the blank margins, then align the repeated artwork with a 10 mm overlap. Final pitch: 380 × ${boardGeometry(form.elements.benches.checked,form.elements.piles.checked).height} mm. ${form.elements.benches.checked?'Coaches sit upright (63 × 88 mm); five 25 mm substitution slots per side. ':''}${form.elements.piles.checked?'Includes two player decks and shared field-duel, goal-duel and special-card piles. ':''}All card slots are 63 × 88 mm.`
    : `Portrait. ${tokenGridFor(paper).capacity} tokens with spares, repeated to fill the sheet. Each base set has 10 substitutions, 1 Derby star, 3 balls and 2 captains. Print double-sided using the selected binding. The Derby token has the logo on its front and a star on its back; other tokens match on both sides. Test a sheet pair before cutting the 25 mm circles.`;
  const content = all ? renderAll(options) : view.players ? renderDeck(view,options) : view.cards ? renderCollection(view,options) : view===views.board ? renderBoard(paper) : renderTokens(paper,sides,edge);
  sheets.innerHTML=content;
  sheets.lang=language;
  document.querySelector('#status').textContent=`${sheets.children.length} printed pages · ${paper.toUpperCase()} · ${all?'Complete kit':isCards?'63 × 88 mm cards':view===views.board?'Full-size pitch':'25 mm tokens'}`;
  const button = document.querySelector('#print-button'); button.disabled=true;
  document.querySelector('#status').textContent+=' · Preparing artwork…';
  // Named pages keep paper size and orientation in browser-generated PDFs.
  let style=document.querySelector('#page-size');
  if (!style) {style=document.createElement('style');style.id='page-size';document.head.append(style);}
  style.textContent=`@page derby-portrait {size: ${paper==='a3'?'A3':'A4'} portrait; margin:0;} @page derby-landscape {size:A3 landscape; margin:0;} @page {size: ${paper==='a3' ? (view===views.board?'A3 landscape':'A3 portrait') : 'A4 portrait'}; margin:0;}`;
  ready=assetsReady().then(()=>{
    if(id!==generation)return;
    button.disabled=false;
    document.querySelector('#status').textContent=document.querySelector('#status').textContent.replace(' · Preparing artwork…',' · Ready');
  }).catch(()=>{
    if(id!==generation)return;
    const error=document.querySelector('#error');error.hidden=false;error.textContent='An image could not load. Reload the page before printing.';
  });
}
form.addEventListener('change',()=>{
  const nationalities=Object.fromEntries(COACHES.map((coach,index)=>[coach.name,form.elements.namedItem(`coach-nationality-${index}`).value]));
  try {localStorage.setItem(coachStorageKey,JSON.stringify(nationalities));} catch {}
  render();
});
window.addEventListener('hashchange',render);
document.querySelector('#print-button').addEventListener('click',async()=>{await ready;if(!document.querySelector('#print-button').disabled)window.print();});
render();
