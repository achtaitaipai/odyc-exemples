import { createGame } from 'odyc'

const cellWidth = 8
const cellHeight = 8

function genSprite() {
	let color = Math.floor(Math.random() * 8) + 2
	let sprite = Array.from({ length: cellHeight }, () =>
		Array(cellWidth).fill('.'),
	)
	let i = 0
	for (let y = 0; y < cellHeight; y++) {
		for (let x = 0; x < cellWidth / 2; x++) {
			i++
			const distanceFromCenter =
				Math.sqrt(x ** 2 + (y - cellHeight / 2) ** 2) /
				Math.sqrt((cellWidth / 2) ** 2 + (cellHeight / 2) ** 2)
			if (Math.random() > 0.9) color = Math.floor(Math.random() * 8) + 2
			if (Math.random() > distanceFromCenter) {
				sprite[y][
					Math.floor(cellWidth / 2) - x - (cellWidth % 2 === 0 ? 1 : 0)
				] = color
				sprite[y][Math.floor(cellWidth / 2) + x] = color
			}
		}
	}
	sprite = sprite.map((r, y) =>
		r.map((c, x) => {
			if (c === '.') return c
			const count =
				Number(y === 0 || sprite[y - 1][x] === '.') +
				Number(y === cellHeight - 1 || sprite[y + 1][x] === '.') +
				Number(x === 0 || sprite[y][x - 1] === '.') +
				Number(x === cellWidth - 1 || sprite[y][x + 1] === '.')
			if (count > 0) return '0'
			return c
		}),
	)
	return sprite.map((el) => el.join('')).join('\n')
}

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
			sprite: genSprite(),
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

game.getAll('@').forEach((el) => (el.sprite = genSprite()))
