export const logo = (className = '') => `<img class="derby-logo ${className}" src="resources/derby-logo.png" alt="DERBY — The Card Game">`;

// Scalable artwork following the supplied token reference: white double ring,
// yellow substitution disc with circular arrows, and a black/white football.
export function tokenArt(type, back = false) {
  if (type === 'derby' && !back) return `<div class="token derby-token">${logo()}</div>`;
  // Show the original reference at its native aspect ratio, clipped to each
  // token's bounds. Keep the source PNG intact so its artwork is not redrawn.
  if (type === 'sub' || type === 'ball') {
    const [x,y,size] = type === 'sub' ? [164,178,126] : [22,185,118];
    return `<div class="token reference-token"><img src="resources/token-reference.png" alt="${type==='sub'?'Substitution':'Ball'}" style="width:${313/size*25}mm;height:${330/size*25}mm;left:${-x/size*25}mm;top:${-y/size*25}mm"></div>`;
  }
  const star = `<circle cx="50" cy="50" r="49" fill="#101a32"/><circle cx="50" cy="50" r="44" fill="none" stroke="#ffb800" stroke-width="2.3"/><path d="m50 17 10 22 24 3-18 17 5 24-21-12-21 12 5-24-18-17 24-3Z" fill="#ffb800"/>`;
  return `<div class="token ${type}-token"><svg viewBox="0 0 100 100" role="img" aria-label="${type==='sub'?'Substitution':type==='ball'?'Ball':'Derby star'}">${star}</svg></div>`;
}
export function matchTokens() {
  return [...Array.from({length:10},(_,i)=>({id:`sub-${i+1}`,type:'sub',label:'SUBSTITUTION'})), {id:'derby',type:'derby',label:'DERBY STAR'}, {id:'ball',type:'ball',label:'BALL'}];
}
export function tokenOrder(tokens,edge) {
  const columns=6, rows=2;
  return tokens.map((_,i)=>{
    const row=Math.floor(i/columns), col=i%columns;
    return tokens[edge==='short'?(rows-1-row)*columns+col:row*columns+columns-1-col];
  });
}
