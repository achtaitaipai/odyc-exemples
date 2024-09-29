import { createGame } from "odyc";

const flags = {
  dressed: false,
  mails: false,
  coffee: false,
};

function reset() {
  minutes = 408;
  flags.dressed = false;
  flags.mails = false;
  flags.coffee = false;
}

/**
 * @param {number} minutes
 * @returns  {string}
 */
function formatMinutes(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = minutes % 60;
  let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(mins).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}

let minutes = 408;
const sprites = {
  naked: `
		  ...55...
		  ...55...
		  .555555.
		  5.5555.5
		  5.5555.5
		  ..5555..
		  ..5..5..
		  ..5..5..
	  `,
  withTshirt: `
		  ...55...
		  ...55...
		  .111111.
		  5.1111.5
		  5.1111.5
		  ..5555..
		  ..5..5..
		  ..5..5..
	  `,
  withPant: `
		  ...55...
		  ...55...
		  .555555.
		  5.5555.5
		  5.5555.5
		  ..3333..
		  ..3..3..
		  ..0..0..
	  `,
  withPantAndTshirt: `
		  ...55...
		  ...55...
		  .111111.
		  5.1111.5
		  5.1111.5
		  ..3333..
		  ..3..3..
		  ..0..0..
	  `,
};

const readTime = () => {
  return game.openDialog(`${formatMinutes(minutes)}...`);
};

const days = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI"];
let dayIndex = 2;

const game = createGame({
  player: {
    sprite: `
		  99999999
		  92255229
		  12255221
		  15555551
		  51555515
		  33333333
		  33333333
		  33333333
	  `,
    position: [1, 2],
  },
  templates: {
    //mur1
    x: {
      sprite: 2,
    },
    //mur2
    X: {
      sprite: `
		  22222222
		  22222222
		  22222222
		  22222222
		  22222222
		  22222222
		  00000000
		  00000000
	  `,
    },
    //pantalon
    "+": {
      solid: false,
      sprite: `
		  ........
		  ........
		  ........
		  ..3333..
		  ..3..3..
		  ..3..3..
		  ..3..3..
		  ........
	  `,
      onEnter: function (target) {
        minutes += 2;
        target.remove();
        if (game.player.sprite === sprites.withTshirt) {
          game.player.sprite = sprites.withPantAndTshirt;
          flags.dressed = true;
        } else game.player.sprite = sprites.withPant;
        readTime();
      },
    },
    //tshirt
    "=": {
      solid: false,
      sprite: `
		  ........
		  .111111.
		  ..1111..
		  ..1111..
		  ..1111..
		  ........
		  ........
		  ........
	  `,
      onEnter: function (target) {
        minutes += 2;
        target.remove();
        if (game.player.sprite === sprites.withPant) {
          game.player.sprite = sprites.withPantAndTshirt;
          flags.dressed = true;
        } else game.player.sprite = sprites.withTshirt;
        readTime();
      },
    },
    //table
    t: {
      sprite: `
		  11112111
		  11002111
		  11002111
		  11000111
		  11111111
		  99999999
		  9......9
		  9......9
	  `,
      onCollide: async function () {
        minutes += 3;
        if (!flags.mails) {
          flags.mails = true;
          await game.openDialog(
            "Pfiou, heureusement que j'ai lu mes mails, le rendez-vous a changé."
          );
        } else {
          await game.openDialog("Ahah trop drôle cette vidéo");
        }
        readTime();
      },
    },
    //chaise
    c: {
      sprite: `
		  ........
		  ..9.....
		  ..9.....
		  ..9.....
		  ..9.....
		  ..9999..
		  ..9..9..
		  ..9..9..
	  `,
    },
    //plaques1
    p: {
      sprite: `
		  02222220
		  02200220
		  02000020
		  02200220
		  02222220
		  02200220
		  02000020
		  02200220
	  `,
      onCollide: async function () {
        minutes += 5;
        if (!flags.coffee) {
          flags.coffee = true;
          await game.openDialog("Jamais sans mon petit café!");
        } else await game.openDialog("Cette fois c'est le dernier!");
        readTime();
      },
    },
    //plaques2
    P: {
      sprite: `
		  02222220
		  00000000
		  02222220
		  .0222220
		  ..000000
		  ........
		  ........
		  ........
	  `,
      solid: false,
    },
    //lit 1
    l: {
      sprite: `
		  99999999
		  92222229
		  12222221
		  12222221
		  11111111
		  33333333
		  33333333
		  33333333
	  `,

      onLeave: function () {
        game.player.sprite = sprites.naked;
        game.openDialog(
          `Ohh non, déjà ${formatMinutes(
            minutes
          )}! Si j'arrive encore en retard ils vont me virer.`
        );
      },
    },
    //lit 2
    L: {
      sprite: `
		  33333333
		  33333333
		  99999999
		  9......9
		  ........
		  ........
		  ........
		  ........
		  ........
	  `,
      solid: false,
    },
    E: {
      onCollide: async function () {
        minutes += 1;
        let text =
          "Vous avez passé la journée à vous assoupir... La prochaine fois buvez un café avant de partir, autrement, vous serez viré.";
        if (minutes > 420)
          text = `${formatMinutes(
            minutes
          )}, Vous êtes en retard. Heureusement, le patron vous laisse une dernière chance.`;
        if (!flags.mails)
          text =
            "Vous n'êtes pas allé au bon endroit, le patron vous laisse une dernière chance. La prochaine fois lisez vos mails!";
        if (!flags.dressed)
          text =
            "Vous avez été placé en garde à vue pour exhibitionnisme. En vue des circonstances, votre patron vous laisse une dernière chance.";
        game.player.sprite = null;
        reset();
        await game.openDialog(text);
        dayIndex = (dayIndex + 1) % days.length;
        game.end(days[dayIndex]);
      },
    },
  },
  map: `
	  xXXXXXXx
	  x..=..px
	  xl..t.Px
	  xL.....x
	  x......x
	  x....+.x
	  xc.....x
	  XXX.XXXX
	  ...E....
	  `,
  screenWidth: 8,
  screenHeight: 8,
  background: 6,
  title: days[dayIndex],
});
