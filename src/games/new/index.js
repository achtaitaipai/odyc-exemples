import { createGame } from "odyc";

createGame(
  {
    player: {
      sprite: `
        ...99...
        ...88...
        .000000.
        0.0000.0
        8.0000.8
        ..3333..
        ..3..3..
        ..0..0..
      `,
      position: [4, 4]
    },
    templates: {
      x: {
        sprite: `
          00000000
          0..00..0
          0..00..0
          00000000
          00000000
          0..00..0
          0..00..0
          00000000
        `,
      },
    },
    map: `
      xxxxxxxxxxxxxxxx
      x......xx......x
      x......xx......x
      x..............x
      x......xx......x
      x......xx......x
      x......xx......x
      xxx.xxxxxxx.xxxx
      xxx.xxxxxxx.xxxx
      x......xx......x
      x......xx......x
      x..............x
      x......xx......x
      x......xx......x
      x......xx......x
      xxxxxxxxxxxxxxxx

    `
  }
)
