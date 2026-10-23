import test from 'node:test';
import assert from 'node:assert/strict';
import {paginate,reverseSheet,boardTiles,gridFor} from '../layout.js';
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

import {COACHES,DUELS,FIELD_DUELS,GOAL_DUELS,SPECIALS,SPECIAL_CARDS} from '../data/collections.js';
import {matchTokens,tokenOrder,tokenArt} from '../artwork.js';
test('collections preserve seed counts, copy quantities and action associations',()=>{
 assert.equal(COACHES.length,7);assert.equal(FIELD_DUELS.length,50);assert.equal(GOAL_DUELS.length,40);assert.equal(DUELS.length,90);assert.equal(SPECIAL_CARDS.length,30);
 assert.match(COACHES[0].action.description,/empatado/);assert.match(COACHES[6].action.description,/automaticamente/);
 for(const s of SPECIALS)assert.equal(SPECIAL_CARDS.filter(c=>c.name===s.name).length,s.quantity);
 for(const duel of DUELS)assert.equal(duel.duelAttributes.length,2);
});
test('exact match token set: 10 substitutions, one Derby and one ball',()=>{
 const tokens=matchTokens();assert.equal(tokens.length,12);
 assert.equal(tokens.filter(t=>t.type==='sub').length,10);
 assert.equal(tokens.filter(t=>t.type==='derby').length,1);
 assert.equal(tokens.filter(t=>t.type==='ball').length,1);
 assert.equal(tokenArt('sub',false),tokenArt('sub',true));
 assert.equal(tokenArt('ball',false),tokenArt('ball',true));
 assert.notEqual(tokenArt('derby',false),tokenArt('derby',true));
 assert.match(tokenArt('derby',false),/derby-logo.png/);
});
for(const edge of ['long','short'])test(`token backs register for ${edge}-edge binding`,()=>{
 const tokens=matchTokens();assert.deepEqual(tokenOrder(tokenOrder(tokens,edge),edge),tokens);
 assert.equal(tokenOrder(tokens,edge)[0].id,tokens[edge==='long'?5:6].id);
});
