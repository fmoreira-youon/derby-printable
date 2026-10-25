# DERBY Print & Play

Run `npm run dev`, then open http://localhost:4173. Uses Node.js only, with no
package installation, build step, API, CDN or account. Run `npm test` for tests.

## Routes

Static-host-compatible hash routes also work under a GitHub Pages project path:

| Route (after `index.html`) | Contents |
| --- | --- |
| `#/print` | Component chooser |
| `#/print/all` | Complete kit in one print job / PDF |
| `#/print/decks/blue` | 36 default blue players |
| `#/print/decks/red` | 36 default red players |
| `#/print/board` | Five zones, each with red player, duel and blue player slots |
| `#/print/tokens` | 10 substitutions, 2 captains, 1 Derby star, 1 ball |
| `#/print/coaches` | 7 coaches |
| `#/print/duels` | 50 field + 40 goal duels, with deck filter |
| `#/print/specials` | 30 cards, including repeated copies from the source |

Legacy `front.html` / `back.html` open the corresponding blue-deck side.

## Physical printing

Cards are exactly 63 × 88 mm, including their borders. A3 portrait fits 16
cards (4 × 4); A4 portrait fits 9 (3 × 3). Gaps are 3 mm. Choose fronts, backs
or interleaved front/back pairs. Long-edge binding mirrors columns; short-edge
binding mirrors rows and rotates back artwork 180 degrees. Blank positions on
incomplete sheets are preserved for correct registration.

Use **100% / Actual size**, background graphics on, browser headers/footers off,
and the selected paper size/orientation. Check the 50 mm ruler. Print / Save PDF
opens the browser print dialog. Test a front/back pair first: printer feed
registration varies. For manual duplex, print fronts and backs separately in
matching order, following the printer's paper-feed direction.

Dotted guides sit 1 mm outside the card edge. Cut the actual card boundary,
using the guides to locate it. This is a home-print layout without professional
bleed. A4 card sheets require no more than 7.5 mm side margins.

The pitch assembles to 380 × 310 mm, with fifteen full-size card slots. Print
on **two A3 landscape sheets** (top/bottom), or **four A4 portrait sheets**
(top left, top right, bottom left, bottom right). Each join repeats 10 mm of
artwork: trim blank paper, align the repeated artwork, then tape/glue the overlap.
A single A3 cannot fit three 88 mm card rows plus labels and safe margins.

Tokens are 25 mm diameter. Exactly 14 physical tokens are supplied, with 14
fronts and 14 registered backs. Substitution, captain and ball faces match; the Derby
star has the Derby logo over a red-to-blue gradient on its front and a star on its reverse. All ten
substitutions use the same yellow reference design.

## Player card options

- Stadium (default) or plain background for lower ink use.
- Nationality on/off on backs for chemistry. Showing it reveals nationality
  while the card is face down, so select the option appropriate to your game.
- Deck name on/off on player backs, independently of nationality.
- Larger ability text; orange/blue attribute columns with labels above values.
- No card footer, freeing space for ability text. Page identification remains
  outside the cut cards.

## Sources and fidelity

Based on `new-version` at `87b72a6`, preserving its text fixes and pitch labels.

Player data in `data/decks.js` comes from `derby-digital/fase2-game-engine`,
`backend/src/seeds/cardsData.ts`. `data/collections.js` contains a snapshot of
`duelTypesSeed.ts`, `specialsSeed.ts`, and the seven coach/action associations
in `coachService.ts` and `actionService.ts`. Repeated duel entries and special
quantities are preserved. All card titles and ability/effect text are translated into English; proper
names, attributes, triggers and copy quantities are preserved. These are source snapshots,
not queries of the live game database.

The original white Derby logo was recovered from the earlier DERBY UI source.
`resources/stadium.jpg` is the JPEG sourced from the
previous `background-player.svg`. It is optimized to 1400 pixels wide for the 63 × 88 mm card face.
The supplied player reference guided the typography and attribute layout.

Substitution and ball tokens use the supplied original PNG reference, clipped
in the page without redrawing the artwork. The reference is about 120 pixels
across per token; vector originals would improve final print sharpness.
The Derby token uses the original logo on its front and a gold star on its back.

## Main files

- `app.js`: routes, shared card layouts, controls and image readiness
- `artwork.js`: logo and token artwork, token set and duplex order
- `layout.js`: card pagination, duplex order and board tile coordinates
- `print.css`: screen UI and physical print dimensions
- `data/`: player and collection snapshots
- `server.mjs`: local Node.js static server
- `tests/layout.test.js`: data counts, pagination, token faces and registration

## Collection design

Coaches use solid dark navy, a tactical clipboard icon and framed backs.
Field duels use green, with a distinct solid green for goal duels. Attributes appear
once in the central matchup, and effects use larger type beneath it.
Special cards use gold with a clear title and larger effect text,
without a decorative star. Card dimensions and source rules are unchanged.

## Print everything

`#/print/all` combines both player decks, all 7 coaches, all 90 duels,
30 special-card copies, 14 tokens and the full-size pitch. The duel filter
does not reduce the complete kit. Player background, nationality and deck-name
options apply to both decks.

With fronts + backs, pitch tiles have blank reverse pages so each tile uses
a separate physical sheet. Fronts only includes the pitch; backs only omits it.
A3 PDFs combine portrait card/token pages with landscape pitch pages; save
as PDF first, then print at actual size with automatic page orientation.
A4 uses portrait throughout. The complete duplex kit is 36 PDF pages in A3
or 56 in A4, including intentional blank pitch reverses.
