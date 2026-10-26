export const CARD = { width: 63, height: 88, gap: 3 };
export function gridFor(paper) { return paper === 'a4' ? { columns: 3, rows: 3 } : { columns: 4, rows: 4 }; }
export function paginate(cards, paper) {
  const { columns, rows } = gridFor(paper), size = columns * rows;
  return Array.from({ length: Math.ceil(cards.length / size) }, (_, i) =>
    Array.from({ length: size }, (_, j) => cards[i * size + j] ?? null));
}
// Preserve empty slots on the last sheet so every back matches its front.
export function reverseSheet(sheet, paper, edge) {
  const { columns, rows } = gridFor(paper);
  return sheet.map((_, index) => {
    const row = Math.floor(index / columns), col = index % columns;
    return edge === 'short' ? sheet[(rows - 1 - row) * columns + col]
      : sheet[row * columns + columns - 1 - col];
  });
}
export function boardGeometry(benches = false) {
  return {width:380,height:benches?450:310,fieldTop:benches?70:0,tileHeight:benches?230:160,stepY:benches?220:150};
}
export function boardTiles(paper, benches = false) {
  const {tileHeight,stepY}=boardGeometry(benches);
  return paper === 'a4'
    ? [{x:0,y:0},{x:185,y:0},{x:0,y:stepY},{x:185,y:stepY}].map(p => ({...p,width:195,height:tileHeight}))
    : [{x:0,y:0,width:380,height:tileHeight},{x:0,y:stepY,width:380,height:tileHeight}];
}
