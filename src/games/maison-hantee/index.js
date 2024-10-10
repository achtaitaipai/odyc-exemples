import { createGame, createSound } from "odyc"
const sketuve = `
		...4.44..
		..44444..
		..444.4..
		..44444..
		...4444..
		..88888..
		.44444...
		.56...65.
		.5.....5.
	`
const chat = `
		00.......
		0.....0.0
		0.....000
		000000000
		000000000
		0000000..
		0000000..
		0.....0..
		0.....0..
	`
const grimoire = `
       
		.........
		111101111
		111101111
		111101111
		111101111
		111101111
		111101111
		111101111
		.........
	
    `

const fin = `
		.0.....0.
		..0...0..
		...000...
		000000000
		..00000..
		000000000
		..01010..
		.0.0.0.0.
		0.......0
	`


const game = createGame({
  title: `LA MAISON HANTEE




  
            par Elise`,
  background: 9,
  cellWidth: 9,
  cellHeight: 9,
  player: {
    sprite: `
		...666...
		...888...
		...888...
		...787...
		..77777..
		..70507..
		..83338..
		...3.3...
		..00.00..
	`,
    position: [4, 2],
  },


  templates: {
    //Fantome solide
    f: {
      sprite:
        `
		...11...
		..1111..
		..0101..
		..1111..
		11101111
		.111111.
		.111111.
		11111111
        11111111
      ` ,
    },//Fantome liquide
    q: {
      sprite: `
		...11...
		..1111..
		..0101..
		..1111..
		11101111
		.111111.
		.111111.
		11111111
        11111111
      `,
      solid: false
    },

    //Vampire haut
    v: {
      sprite:
        `
		..11111..
		001010100
		.0111110.
		.0000400.
		.0000000.
		.0000400.
		.0000000.
		.0000000.
		.0000000.
      `
    },
    //Clown
    c: {
      sprite:
        `
		..11111..
		661010166
		661141166
		..18881..
		333111333
		333444333
		333454333
		333434333
		333454333
	`
    },
    //Couteau
    k: {
      sprite:
        `
		.......14
		......114
		.....111.
		....111.4
		...111...
		..001...4
		.000.....
		000...444
		00...4444
	`,
      dialog: "Brrr, cet endroit n'est pas du tout accueillant...",
    },
    //Vampire bas
    V: {
      sprite:
        `
		.1000001
		..00000.
		..00000.
		..00000.
		..00000.
		..00000.
		..00000.
		..00000.
	`, dialog: "Oooh, quel petit chat mignon! J'ai déjà un animal domestique, c'est dommage!"
    },
    //Balais
    b: {
      sprite:
        `
		.......6
		......6.
		.....6..
		....6...
		.5.6....
		555.....
		5555....
		555.....
	`,
      dialog: "Je suis le balais le plus rapide du monde."
    },
    //Sorciere
    w: {
      sprite:
        `
		....00...
		..000000.
		...6116..
		.00600600
		..000000.
		..000000.
		..000000.
		..000000.
		..000000.
	`,
      dialog: "Abracadabra un chat tu seras!",
      sound: createSound('POWERUP', 1988),
      onCollide: function (target) {
        game.player.sprite = chat
        target.remove()
      }
    },
    //Grimoire
    g: {
      sprite:
        `
		.44444445
		.44444445
		.44444445
		.44444445
		.44444445
		.44444445
		.44444445
		.44444445
		.44444445
	`,
      onCollide: async function (target) {
        target.sprite = grimoire
        await game.openDialog("Oh, un grimoire! Je vais essayer de retrouver une forme humaine! Arbadacarba, je ne veux plus être un chat!")
        game.playSound('POWERUP', 666)
        game.player.sprite = fin
        await game.openDialog("Oups, ce n'est pas ce que j'avais prévu, je vais finalement rester ici.")
        game.end('Fin...')
      }
    },

    //Tete de mort
    t: {
      sprite: `
		.1111111.
		.1001001.
		.1001001.
		.1001001.
		.1111111.
		.1111111.
		..11111..
		..10101..
		..10101..
	`,
      dialog: "Je n'ai jamais pu sortir d'ici, je suis tombé sur un os..."
    },
    //Os 
    o: {
      sprite: `
		......11.
		......111
		.....1111
		....111..
		...111...
		..111....
		1111.....
		111......
		.11......
	`,
      onCollide: function (target) {
        target.remove()
        game.setAll('s', {
          solid: false,
          dialog: 'Ohh merci pour ce bel os. Tu peux passer!'
        })
      },
      dialog: "Oh, un bel os, je le garde!",
      sound: createSound('PICKUP', 9)

    },
    //décor
    d: {
      sprite: `
		.0000000.
		00..0..00
		0.00.00.0
		0..0.0..0
		000000000
		0..0.0..0
		0.00.00.0
		00..0..00
		.0000000.
	`,
      solid: false,
      onEnter: function (target) {
        target.remove()
      },
      sound: createSound('HIT', 9)
    },
    //piege
    p: {
      sprite: `
		
		.........
        .........
        .........
        .........
		.4.......
		.........
		2.2.2.4.2
		2.2.2.2.2
		222222222
	`},
    //piege2
    P: {
      sprite: `
       222222222
		.2.2.2.2.
		.4.2.4.2.`},
    //mur
    x: {
      sprite: `
		222222201
		222222201
		000000000
		111011111
		222012222
		222012222
		000000000
		111111101
		222222201
	`
    },
    //clef
    F: {
      sprite: `
		........5
		.......55
		......55.
		.....5555
		.55.55.5.
		5..5.....
		5...5....
		.5..5....
		..55.....
	`,
      dialog: "Chic! Une clé en or, je vais surement pouvoir la vendre chère!",
      sound: createSound('PICKUP', 5),
      onCollide: function (target) { target.remove() },
    },
    //Feu
    a: {
      sprite: `
		...5.....
		...5.....
		..555....
		..5655..5
		5.5665.55
		555666556
		466446666
		444444444
	`,
      solid: false,
      visible: false,
      onLeave: function (target) {
        target.visible = true
      },
      onEnter: async function (target) {
        if (target.visible) {
          game.playSound('EXPLOSION', 69)
          await game.openDialog('Aïe!')
          game.player.position = [40, 4]
          game.setAll('a', { visible: false, solid: false })
        }
      }
    },
    //trone
    i: {
      sprite: `
		..44444..
		..44444..
		..44444..
		..44444..
		..44444..
		..88888..
		.4444444.
		.56...65.
		.5.....5.
	`,
      onCollide: async function (target) {
        if (target.sprite !== sketuve) {
          await game.playSound('EXPLOSION', 33)
          target.sprite = sketuve;
        }
      },
      dialog: "J'ai une envie subite de me faire les griffes."
    },
    O: {
      sprite: `
		..55555..
		.5555555.
		.5.555.5.
		.5555555.
		..55555..
		...555...
		....5....
		....5....
		..55555..
	`,
      dialog: 'Meilleur suceur\nDécerné à Droculo en 1756'
    },
    // chaudron
    u: {
      sprite: `
		..00000..
		.00...00.
		.0.....0.
		000000000
		.0777770.
		.0000000.
		.0000000.
		.0000000.
		..00000..
	`,
      dialog: "Hum, cette soupe a une drôle d'odeur..."
    },
    //chien
    s: {
      sprite: `
		.22.22...
		..222....
		..020....
		..202..22
		...2...2.
		...2222..
		...2222..
		...2..2..
		..22.22..
	`,
      dialog: "Comment faire pour que ce molosse me laisse passer? Si seulement j'avais un os...",
    },
    //chauve souris
    S: {
      sprite: `
		...0.0...
		...000...
		000505000
		000040000
		.0000000.
		.0000000.
		..00000..
		...000...
		....0....
	`,
      dialog: "Certains fantômes sont gentils et te laisseront passer..."
    },
    j: { sprite: 7 },
  },

  map: `
    jjJ...jj  xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx
    jj....jj  x...b..x x....... .v.xx.Fx xqqqqfff xaaaaaaa x......x
    jj....jj  x.u...w. .....i.. .V.xx..x xqffqqff xaxxxxxx x......x
    jj....jj  x......x x..t.... ...PP..x xqfffqff xaxxxxaa ....g..x
    jj....jj  x......x x....... .......x xqqffqqq .axxxxax x......x
    xxcddcxx  xxx..xxx x....... ..Sxx..x xfqfffff xaaaxxax x......x
    x.......  .......x x.o..... ...xx.s. .qqfffff xxxaaaax x......x
    x.......  ...k...x xxxxxxxx xxxxxxxx xxxxxxxx xxxxxaxx xxxxxxxx
  `
})
