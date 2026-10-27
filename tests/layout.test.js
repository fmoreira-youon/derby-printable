import test from 'node:test';
import assert from 'node:assert/strict';
import {paginate,reverseSheet,boardTiles,gridFor,boardGeometry} from '../layout.js';
import {DECK1_PLAYERS,DECK2_PLAYERS} from '../data/decks.js';
test('both complete source decks retain all 36 unique players and goalkeeper attributes',()=>{
  for(const deck of [DECK1_PLAYERS,DECK2_PLAYERS]) {
    assert.equal(deck.length,36);assert.equal(new Set(deck.map(p=>p.name)).size,36);
    for(const p of deck.filter(p=>p.position==='GOALKEEPER')) for(const key of ['handling','reflexes','exits']) assert.equal(typeof p.attributes[key],'number');
  }
});
for(const paper of ['a3','a4']) {
 test(`${paper}: all cards appear once, including last sheet`,()=>{
   assert.deepEqual(paginate(DECK1_PLAYERS,paper).flat().filter(Boolean),DECK1_PLAYERS);
 });
 for(const edge of ['long','short']) test(`${paper}/${edge}: reverse registration is an involution, with blanks preserved`,()=>{
   const sheets=paginate(Array.from({length:19},(_,i)=>i+1),paper);
   for(const sheet of sheets) assert.deepEqual(reverseSheet(reverseSheet(sheet,paper,edge),paper,edge),sheet);
   const sheet=sheets[0], {columns,rows}=gridFor(paper);
   assert.equal(reverseSheet(sheet,paper,edge)[0],edge==='long'?sheet[columns-1]:sheet[(rows-1)*columns]);
 });
 test(`${paper}: board tiles cover full 380 × 310 mm without shrinking`,()=>{
   const tiles=boardTiles(paper);
   for(let y=0;y<310;y++)for(let x=0;x<380;x++)assert.ok(tiles.some(t=>x>=t.x&&x<t.x+t.width&&y>=t.y&&y<t.y+t.height));
 });
}

import {COACHES,BASE_COACHES,EXTRA_COACHES,DUELS,FIELD_DUELS,GOAL_DUELS,SPECIALS,SPECIAL_CARDS} from '../data/collections.js';
import {matchTokens,tokenOrder,tokenArt,tokenSlots,tokenGridFor,fillTokenSheet} from '../artwork.js';
test('collections preserve seed counts, copy quantities and action associations',()=>{
 assert.equal(COACHES.length,16);assert.equal(FIELD_DUELS.length,50);assert.equal(GOAL_DUELS.length,40);assert.equal(DUELS.length,90);assert.equal(SPECIAL_CARDS.length,30);
 assert.match(COACHES[0].action.description,/draw/);assert.match(COACHES[6].action.description,/automatically/);
 for(const s of SPECIALS)assert.equal(SPECIAL_CARDS.filter(c=>c.name===s.name).length,s.quantity);
 for(const duel of DUELS)assert.equal(duel.duelAttributes.length,2);
});
test('exact match token set: 10 substitutions, two captains, one Derby and three balls',()=>{
 const tokens=matchTokens();assert.equal(tokens.length,16);
 assert.equal(tokens.filter(t=>t.type==='sub').length,10);
 assert.equal(tokens.filter(t=>t.type==='derby').length,1);
 assert.equal(tokens.filter(t=>t.type==='ball').length,3);
 for(const type of ['captain-blue','captain-red']) {
  assert.equal(tokens.filter(t=>t.type===type).length,1);
  assert.equal(tokenArt(type,false),tokenArt(type,true));
 }
 assert.equal(tokenArt('sub',false),tokenArt('sub',true));
 assert.equal(tokenArt('ball',false),tokenArt('ball',true));
 assert.notEqual(tokenArt('derby',false),tokenArt('derby',true));
 assert.match(tokenArt('derby',false),/derby-logo.png/);
});
for(const edge of ['long','short'])test(`token backs register for ${edge}-edge binding`,()=>{
 const tokens=matchTokens();assert.deepEqual(tokenOrder(tokenOrder(tokens,edge),edge),tokenSlots(tokens));
 assert.equal(tokenOrder(tokens,edge)[0].id,tokens[edge==='long'?5:12].id);
});

test('token partial row preserves physical blank positions',()=>{
 const slots=tokenSlots(matchTokens());assert.equal(slots.length,18);
 assert.equal(slots.filter(Boolean).length,16);
 assert.deepEqual(slots.slice(16),[null,null]);
 assert.equal(tokenOrder(slots,'long')[12],null);
 assert.equal(tokenOrder(slots,'long')[15].id,'captain-blue');
 assert.equal(tokenOrder(slots,'short')[0].id,'ball-2');
});

test('all card descriptions and non-person card names use English copy',()=>{
 const players=[...DECK1_PLAYERS,...DECK2_PLAYERS];
 const descriptions=[...players,...COACHES,...DUELS,...SPECIALS].map(c=>c.action?.description||c.description||'');
 for(const copy of [...descriptions,...DUELS.map(c=>c.name),...SPECIALS.map(c=>c.name)]) {
  assert.doesNotMatch(copy,/\b(duelo|jogador|golo|treinador|próximo|ganhar|perder|habilidade|retira|carta|físico|técnica|rapidez|reflexos|saídas)\b/i);
 }
 assert.equal(SPECIALS[0].name,'VAR Review');
 assert.match(DECK1_PLAYERS[0].action.description,/wins the duel/);
});

import {PT,translate} from '../data/locales.js';
test('Portuguese translations cover every ability, effect and special-card title',()=>{
 for(const card of [...DECK1_PLAYERS,...DECK2_PLAYERS,...COACHES,...DUELS,...SPECIALS]) {
  const text=card.action?.description||card.description;
  if(text) {assert.ok(PT[text],text);assert.notEqual(translate(text,'pt'),text);assert.equal(translate(text,'en'),text);}
 }
 for(const card of SPECIALS)assert.ok(PT[card.name],card.name);
 assert.equal(translate('VAR Review','pt'),'Recurso ao VAR');
 assert.equal(translate('José Santos','pt'),'José Santos');
});

import {triggerLabel,TRIGGER_LABELS} from '../data/locales.js';
test('every printed duel and special effect has a translated timing label',()=>{
 for(const card of [...DUELS,...SPECIALS]) {
  if(!card.action&&!card.description)continue;
  const trigger=card.action?.trigger||card.trigger;
  assert.ok(TRIGGER_LABELS[trigger],trigger);
  assert.ok(triggerLabel(trigger,'en'));
  assert.notEqual(triggerLabel(trigger,'pt'),triggerLabel(trigger,'en'));
 }
 assert.equal(triggerLabel('duel_resolved','en'),'On duel end');
 assert.equal(triggerLabel('duel_draw','pt'),'Em caso de empate');
 assert.equal(triggerLabel('immediate','en'),'Immediate');
});

test('coach sheet is full in A3 and supplied base nationalities are exact',()=>{
 assert.deepEqual(BASE_COACHES.map(c=>[c.name,c.nationality]),[
  ['José Santos','PT'],['Mário João','BR'],['Rafael Passos','PT'],['Emílio Pateiro','ES'],
  ['Osvaldo Oliva','MX'],['Nick Role','EN'],['Martin Callado','AR']
 ]);
 assert.equal(EXTRA_COACHES.length,9);assert.equal(new Set(COACHES.map(c=>c.name)).size,16);
 const sheets=paginate(COACHES,'a3');assert.equal(sheets.length,1);assert.ok(sheets[0].every(Boolean));
 for(const coach of EXTRA_COACHES){assert.equal(coach.edition,'printable-expansion');assert.ok(PT[coach.action.description]);}
});
for(const paper of ['a3','a4'])for(const [benches,piles] of [[false,false],[true,false],[false,true],[true,true]])test(`${paper}: board options ${benches}/${piles} keep full-size coverage and sheet count`,()=>{
 const compact=boardTiles(paper),tiles=boardTiles(paper,benches,piles),geometry=boardGeometry(benches,piles);
 const expanded=benches||piles;
 assert.equal(tiles.length,compact.length);assert.equal(geometry.height,expanded?480:310);
 assert.equal(geometry.fieldHeight+2*geometry.fieldTop,geometry.height);
 assert.equal(tiles[0].height-tiles[tiles.length-1].y,10);
 for(let y=0;y<geometry.height;y++)for(let x=0;x<380;x++)assert.ok(tiles.some(t=>x>=t.x&&x<t.x+t.width&&y>=t.y&&y<t.y+t.height));
 for(const tile of tiles){assert.ok(tile.height<=245);assert.ok(tile.width<=(paper==='a4'?195:380));}
});

for(const paper of ['a3','a4'])test(`${paper}: token sheets fill capacity with unique copies and registered reverses`,()=>{
 const tokens=fillTokenSheet(paper),{columns,capacity}=tokenGridFor(paper);
 assert.equal(tokens.length,paper==='a3'?80:42);assert.equal(tokens.length,capacity);
 assert.equal(new Set(tokens.map(t=>t.id)).size,capacity);
 const base=matchTokens();
 assert.deepEqual(tokens.slice(0,base.length).map(t=>[t.type,t.label]),base.map(t=>[t.type,t.label]));
 assert.ok(tokens.filter(t=>t.type==='ball').length>=3);
 for(const edge of ['long','short']) {
  const backs=tokenOrder(tokens,edge,columns);
  assert.ok(backs.every(Boolean));assert.deepEqual(tokenOrder(backs,edge,columns),tokens);
  assert.equal(backs[0].id,tokens[edge==='long'?columns-1:capacity-columns].id);
 }
});
