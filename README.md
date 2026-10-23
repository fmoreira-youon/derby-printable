# DERBY Print & Play

Dependency-free print studio. Run `npm run dev` and open http://localhost:4173.
Use `npm test` for deck integrity, duplex registration and board coverage checks.

## Routes

Static-host-compatible hash routes work on GitHub Pages, including project subpaths:

- `index.html#/print` — component chooser
- `index.html#/print/decks/blue` — default blue players (36)
- `index.html#/print/decks/red` — default red players (36)
- `index.html#/print/board` — five zones, each with red player, duel and blue player slots
- `index.html#/print/tokens` — Derby star, ball and configurable substitutions

No server rewrites, CDN scripts, backend, account or build step are required.
The legacy `front.html` and `back.html` entrypoints redirect to the blue deck with the corresponding side selected.

## Printing

Cards use an explicit border-box size of 63 × 88 mm. A3 portrait fits 4 × 4
cards with 3 mm gutters; A4 portrait fits 3 × 3. Every sheet uses a fixed grid,
including blank positions on the last sheet. For duplex printing, pages alternate
front/back. Long-edge binding mirrors columns; short-edge binding mirrors rows
and rotates back artwork 180 degrees. For manual duplex, print fronts and backs
separately, keeping the original page order and matching the printer feed direction.
Always test a pair first: printer feed offsets cannot be eliminated in CSS.

Use Print / Save PDF (the browser print dialog), actual size / 100%, backgrounds on,
headers and footers off, and the selected paper size/orientation. The 50 mm ruler
checks scale. The dotted guides sit 1 mm outside the card edge; cut at the actual
card boundary, using the guides to locate it. This is a home-print layout, without
professional bleed. Leave at least 7.5 mm printable margins for A4 card sheets.

The assembled pitch is 380 × 310 mm, with fifteen full-size 63 × 88 mm slots.
It prints on **two A3 landscape** pages (top/bottom), or **four A4 portrait**
pages (top left, top right, bottom left, bottom right). Each join repeats 10 mm
of artwork. Trim blank paper, align the repeated art, then tape/glue the overlap.
A single A3 cannot fit three rows of 88 mm cards plus labels and safe margins;
shrinking the board would make the card spaces too small.

Tokens are 25 mm diameter, single-sided. Default output is one star, one ball,
and three substitutions per team; the latter is a configurable print quantity,
not a declared game rule. A4 is generally sufficient for tokens.

## Data and scope

`data/decks.js` is a snapshot of `DECK1_PLAYERS` (red) and `DECK2_PLAYERS` (blue)
from `fmoreira-youon/derby-digital`, branch `fase2-game-engine`, commit
`ce66655cd4b971e9f42fa5341f0ac848784d4fe2`,
`backend/src/seeds/cardsData.ts`. Statistics use the explicit current attribute
names; goalkeeper cards show handling, reflexes and exits. Ability descriptions
remain verbatim in Portuguese from that source. Change the snapshot to update
printable data; printing has no live API dependency.

The studio includes the **player portion** of the default decks. Special cards,
coaches and duel cards are not included in this first version. Consequently this
is not yet a complete playable kit. The pitch follows the game engine's five
zones; the labels on the red side are mirrored for the opposing player.
Token symbols and card backs are provisional vector/CSS artwork. Replace them
with approved original designs before calling this the final physical edition.

The existing flags are reused. This lightweight package excludes the unused
31 MB background-player.svg and obsolete JSON files. They remain in the original repository.

## Files

- `app.js`: routes, shared renderers, controls and image readiness
- `layout.js`: physical pagination, duplex order and tile coordinates
- `print.css`: screen studio and physical print layouts
- `data/decks.js`: one source for both decks
- `tests/layout.test.js`: Node's built-in test runner, no installation required
