export const logo = (className = '') => `<img class="derby-logo ${className}" src="resources/derby-logo.png" alt="DERBY — The Card Game">`;

// Scalable artwork following the supplied token reference: white double ring,
// yellow substitution disc with circular arrows, and a black/white football.
export function tokenArt(type, back = false) {
  if (type === 'derby' && !back) return `<div class="token derby-token"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49" fill="#101a32"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffb800" stroke-width="2.3"/></svg>${logo()}</div>`;
  if (type.startsWith('captain-')) {
    const color = type === 'captain-blue' ? '#3045ef' : '#f3222b';
    return `<div class="token captain-token"><svg viewBox="0 0 100 100" role="img" aria-label="${type==='captain-blue'?'Blue':'Red'} captain"><circle cx="50" cy="50" r="49" fill="${color}" stroke="white" stroke-width="1.5"/><circle cx="50" cy="50" r="44" fill="none" stroke="white" stroke-width="2"/><text x="50" y="74" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="68" font-weight="700" fill="none" stroke="white" stroke-width="1.8">C</text></svg></div>`;
  }
  // Show the original reference at its native aspect ratio, clipped to each
  // token's bounds. Keep the source PNG intact so its artwork is not redrawn.
  if (type === 'sub' || type === 'ball') {
    const [x,y,size] = type === 'sub' ? [164,178,126] : [22,185,118];
    return `<div class="token reference-token"><img src="resources/token-reference.png" alt="${type==='sub'?'Substitution':'Ball'}" style="width:${313/size*25}mm;height:${330/size*25}mm;left:${-x/size*25}mm;top:${-y/size*25}mm"></div>`;
  }
  const star = `<circle cx="50" cy="50" r="49" fill="#101a32"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffb800" stroke-width="2.3"/><path transform="translate(50 50) scale(.85) translate(-50 -50)" d="m50 17 10 22 24 3-18 17 5 24-21-12-21 12 5-24-18-17 24-3Z" fill="#ffb800"/>`;
  return `<div class="token ${type}-token"><svg viewBox="0 0 100 100" role="img" aria-label="${type==='sub'?'Substitution':type==='ball'?'Ball':'Derby star'}">${star}</svg></div>`;
}
export function matchTokens() {
  return [...Array.from({length:10},(_,i)=>({id:`sub-${i+1}`,type:'sub',label:'SUBSTITUTION'})), {id:'derby',type:'derby',label:'DERBY STAR'}, ...Array.from({length:3},(_,i)=>({id:i===0?'ball':`ball-${i+1}`,type:'ball',label:'BALL'})), {id:'captain-blue',type:'captain-blue',label:'BLUE CAPTAIN'}, {id:'captain-red',type:'captain-red',label:'RED CAPTAIN'}];
}
// Preserve unused cells so duplex mirroring also works on the partial row.
export function tokenSlots(tokens, columns = 6) {
  return Array.from({length:Math.ceil(tokens.length/columns)*columns},(_,i)=>tokens[i]??null);
}
export function tokenOrder(tokens,edge,columns = 6) {
  const slots=tokenSlots(tokens,columns), rows=slots.length/columns;
  return slots.map((_,i)=>{
    const row=Math.floor(i/columns), col=i%columns;
    return slots[edge==='short'?(rows-1-row)*columns+col:row*columns+columns-1-col];
  });
}

export function tokenGridFor(paper) {
  const columns=paper==='a3'?8:6, rows=paper==='a3'?10:7;
  return {columns,rows,capacity:columns*rows};
}
export function fillTokenSheet(paper) {
  const base=matchTokens(), {capacity}=tokenGridFor(paper);
  return Array.from({length:capacity},(_,i)=>{
    const token=base[i%base.length], copy=Math.floor(i/base.length)+1;
    return {...token,id:`${token.id}-copy-${copy}`};
  });
}
