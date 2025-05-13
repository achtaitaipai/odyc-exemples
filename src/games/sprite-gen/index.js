import { createGame } from 'odyc'
import { genSprite } from './spriteGen'

const cellWidth = 8
const cellHeight = 8

const game = createGame({
	cellWidth,
	cellHeight,
	screenWidth: 16,
	screenHeight: 16,
	player: {
		position: [0, 1],
	},
	templates: {
		'#': {
			sprite: 2,
		},
		'@': {
			sprite: 0,
		},
	},
	map: ` 
@.@.@.@.@.@.@.@.
.@.@.@.@.@.@.@.@
@.@.@.@.@.@.@.@.
.@.@.@.@.@.@.@.@
@.@.@.@.@.@.@.@.
.@.@.@.@.@.@.@.@
@.@.@.@.@.@.@.@.
.@.@.@.@.@.@.@.@
@.@.@.@.@.@.@.@.
.@.@.@.@.@.@.@.@
@.@.@.@.@.@.@.@.
.@.@.@.@.@.@.@.@
@.@.@.@.@.@.@.@.
.@.@.@.@.@.@.@.@
@.@.@.@.@.@.@.@.
.@.@.@.@.@.@.@.@
  `,
})

game.getAll('@').forEach((el) => (el.sprite = genSprite(cellWidth, cellHeight)))
