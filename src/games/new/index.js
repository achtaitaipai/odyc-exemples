import { createGame } from "odyc";

const sprites = {
  flower: `
          ...4...
          ..444..
          ...7...
          ...77..
          ..999..
          ..999..
          ..999..
      `,
  water: `
          ...3...
          ...3...
          ..333..
          .33333.
          3333333
          3333333
          .33333.
      `,
  player: `
      ..999..
      ..888..
      ..888..
      .13131.
      8.333.8
      ..333..
      ..3.3..
  `,
  pot: `
  .......
  .......
  ...7...
  ..999..
  ..999..
  ..999..
  .......
`,
  fire: `
  .......
  ...4...
  ..44...
  .4464..
  .46664.
  4665664
  4655564
`,
};

/**@type{Record<string,(initialPos:[number,number],pos:[number,number])=>void>} */
export const fusions = {
  po: function (initialPos, currentPos) {
    game.getCell(...initialPos).remove();
    game.addToCell(...currentPos, "f");
    game.player.position = initialPos;
  },
  Fo: function (initialPos, currentPos) {
    game.getCell(...currentPos).remove();
    game.getCell(...initialPos).remove();
    game.playSound("EXPLOSION");
  },
  Fp: function (initialPos, currentPos) {
    game.getCell(...currentPos).remove();
    game.getCell(...initialPos).remove();
    game.playSound("EXPLOSION");
  },
  Ff: function (initialPos, currentPos) {
    game.getCell(...currentPos).remove();
    game.getCell(...initialPos).remove();
    game.playSound("EXPLOSION");
  },
};
/**
 * @param {import("odyc").Actor} target
 */
function push(target) {
  const [tX, tY] = target.position;
  const [pX, pY] = game.player.position;
  const [dirX, dirY] = [tX - pX, tY - pY];
  const currSymbol = target.symbol;
  const nextSymbol = game.getCell(tX + dirX, tY + dirY).symbol;
  if (currSymbol && nextSymbol) {
    const fusion =
      fusions[currSymbol + nextSymbol] ?? fusions[nextSymbol + currSymbol];
    if (fusion) {
      fusion([tX, tY], [tX + dirX, tY + dirY]);
      return;
    }
  }
  if (game.getCell(tX + dirX * 2, tY + dirY * 2).symbol === "#") {
    game.playSound("HIT");
    return;
  }
  /*@ts-ignore */
  game.addToCell(tX + dirX, tY + dirY, target.symbol);
  target.remove();
  game.player.position = [tX, tY];
}

const game = createGame({
  background: 0,
  cellHeight: 7,
  cellWidth: 7,
  player: {
    sprite: sprites.player,
    position: [1, 1],
  },
  templates: {
    "#": {
      sprite: 2,
    },
    o: {
      sprite: sprites.water,
      onCollide: push,
    },
    p: {
      sprite: sprites.pot,
      onCollide: push,
    },
    f: {
      sprite: sprites.flower,
      onCollide: push,
    },
    F: {
      sprite: sprites.fire,
      onCollide: push,
    },
  },

  map: `
    ########
    #......#
    #..F.p.#
    #......#
    #......#
    #....o.#
    #......#
    ########
    `,
});
