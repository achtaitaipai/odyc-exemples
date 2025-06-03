import { createGame } from 'odyc'

const sprites = {
	player: `
    ...11...
    ...11...
    .111111.
    1.1111.1
    1.1111.1
    ..1111..
    ..1..1..
    ..1..1..
  `,
	playerSwimming: `
		00000000
		00000101
		00111010
		01011000
		00111100
		00000100
		00001010
		00000000
	`,
	bottle: `
    ........
    ........
    ........ 
    ..77777.
    9777777.
    ..77777.
    ........
    ........
  `,
	tree: `
		..7..... 
		.7.777..
		7..95.7.
		...95.7.
		...9...7
		...9....
		...9....
		........
	`,
	tree2: `
		........
		........
		........
		........
		........ 
		...7....
		...9....
		........
	`,
	water: `
		00000000
		00000101
		00100010
		01010000
		00000000
		00000100
		00001010
		00000000
	`,
	block: `
		........
		...11...
		..1111..
		.111111.
		.111111.
		..1111..
		...11...
		........
	`,
	carving1: `
		...11...
		..1111..
		.1.11.1.
		.111111.
		.111111.
		11....11
		111..111
		.111111.
	`,
}
const game = createGame({
	title: ['Une île'],
	background: 0,
	player: {
		sprite: sprites.player,
		position: [3, 4],
	},
	templates: {
		'.': {
			solid: false,
			onEnter: function () {
				game.player.sprite = sprites.player
			},
		},
		',': {
			solid: false,
			onEnter: function () {
				game.player.sprite = sprites.player
				game.setAll('~', { solid: true })
			},
		},
		'~': {
			sprite: sprites.water,
			solid: false,
			onEnter: function () {
				game.player.sprite = sprites.playerSwimming
			},
			onCollide: function () {
				game.setAll('~', { solid: false })
				const [posX, posY] = game.player.position
				game.player.position = [posX - 7, posY]
				game.addToCell(10, 11, 'b')
				game.openMessage([
					'Le courant est trop fort pour repartir',
					"Vous envoyez un appel à l'aide et attendez...",
				])
			},
		},
		T: {
			sprite: sprites.tree,
			onCollide: function () {
				game.openMessage('Vous avez déjà vu cet arbre')
			},
		},
		t: {
			sprite: sprites.tree2,
			onCollide: function () {
				game.openMessage('Petit arbre deviendra grand')
			},
		},
		b: {
			sprite: sprites.bottle,
			onCollide: function (target) {
				game.openMessage([
					"Un appel à l'aide...",
					"Il faut retrouver l'auteur.",
				])
				game.addToCell(...target.position, '.')
			},
		},
		'#': {
			sprite: sprites.block,
		},
		$: {
			sprite: sprites.carving1,
		},
	},
	map: `
  ###############
  #~~~~~~#~~~~~~#
  #~~..~~#~~,,~~#
  #~~...~#~~,,,~#
  #~T...~#~t,,,~#
  #~~..~~#~~,,~~#
  #~~~~~~#~~~~~~#
  ###~~#####~~###
  
  #~~~~~~#~~~~~~#
  #~~~~~~#~~~~~~#
  #~~~~~~#~~~~~~#
  #~~..~~#~~b.~~#
  #.............#
  #.............#
  ###############
  `,
})
