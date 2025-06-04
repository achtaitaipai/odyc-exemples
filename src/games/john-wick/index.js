import { createGame, createSound } from 'odyc'
const sprites = {
	player: `
...88....
...88....
.000000..
0.0000.0.
0.0000.0.
0.0000.0.
0.0000.0.
0.0000.0.
0.0000.0.
8.0..0.8.
..0..0...
..0..0...
..0..0...
..0..0...
..0..0...
.00..00..
`,
	playerH: `
...88....
...88....
.000000..
0.0040.0.
0.0000.0.
0.0000.0.
0.0400.0.
0.0000.0.
0.0000.0.
8.0..0.8.
..0..0...
..0..0...
..0..0...
..0..0...
..0..0...
.00..00..
`,
	playerG: `
...88....
...88....
.000000..
0.0040.0.
0.0000.0.
0.0000.0.
0.0400.0.
0.0000.0.
0.0000.0.
8.0..0.80
..0..0..0
..0..0..0
..0..0...
..0..0...
..0..0...
.00..00..
`,
	dog: `
.........
.........
.........
.........
.........
.........
.........
.....9...
......999
......999
9....999.
9....999.
.9999999.
.9999999.
.99...99.
.9.....9.
`,
	doghurted: `
.........
.........
.........
.........
.........
.........
.........
.........
.....9...
......949
......999
4....999.
9....949.
.9949999.
..9.9499.
499444494
`,
	dogdead: `
.........
.........
.........
.........
.........
.........
.........
....0....
..00000..
....0....
....0....
....0....
....0....
..99999..
.9999999.
999999999
`,
	boss: `
.........
.......99
00.....88
.88886666
......666
......666
......666
......666
......666
......666
......777
......7.7
......7.7
......7.7
......7.7
......7.7
`,
	badguy: `
.........
.......99
00.....88
.88882222
......222
......222
......222
......222
......222
......222
......666
......6.6
......6.6
......6.6
......6.6
......6.6
`,
	dead: `
.........
.........
.........
.........
.........
.........
.........
.........
.........
.........
.........
.........
.......9.
......88.
.00.4.444
..8885444
`,
}

const game = createGame({
	player: {
		sprite: sprites.player,
		position: [4, 5],
	},
	templates: {
		'-': {},
		X: {
			sprite: 9,
		},
		D: {
			sprite: sprites.dog,
			dialog: 'Woof Woof',
			onCollide: (target) => {
				if (target.sprite === sprites.doghurted) {
					target.sprite = sprites.dogdead
					game.getCell(14, 5).remove()
					game.player.sprite = sprites.playerG
				}
			},
		},
		b: {
			sprite: sprites.boss,
			onCollide: async (target) => {
				await game.playSound('LASER', 666)
				await game.playSound('LASER', 666)
				game.player.sprite = sprites.playerH
				game.setAll('D', {
					sprite: sprites.doghurted,
					dialog: null,
				})
				await game.openDialog('That will teach you!')
				game.addToCell(...target.position, 'B')
			},
		},
		B: {
			sprite: sprites.boss,
			dialog: "You'd better take care of your dog.",
		},
		e: {
			sprite: sprites.badguy,
			dialog: '%AaaAAArgh%',
			sound: createSound('LASER', 666),
			onCollide: (target) => {
				target.solid = false
				target.dialog = null
				target.sound = null
				target.sprite = sprites.dead
			},
		},
		Z: {
			sprite: sprites.boss,
			onCollide: async (target) => {
				await game.openDialog("Sorry, I didn't know who you were")
				await game.playSound('FALL', 534633)
				await game.openDialog('Aaaargh')
				target.sprite = sprites.dead
				target.solid = false
			},
		},
		$: {
			solid: false,
			end: 'The End...',
		},
	},
	map: `
	................	................	................
	................	................	................
	................	................	................
	................	................	................
	----------------	----------------	----------------
  .D............b.	..e......e....e.	.e.....e...e..Z.$
	XXXXXXXXXXXXXXXX	XXXXXXXXXXXXXXXX	XXXXXXXXXXXXXXXX
	XXXXXXXXXXXXXXXX	XXXXXXXXXXXXXXXX	XXXXXXXXXXXXXXXX
	XXXXXXXXXXXXXXXX	XXXXXXXXXXXXXXXX	XXXXXXXXXXXXXXXX
	`,
	background: 3,
	cellHeight: 16,
	cellWidth: 9,
	screenHeight: 9,
	screenWidth: 16,
	title: `* * JOHN WICK * * `,
})
