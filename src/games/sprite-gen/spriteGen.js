/**
 * @param {number} width
 * @param {number} height
 */
export function genSprite(width, height) {
	let color = randomColor()
	let sprite = Array.from({ length: height }, () => Array(width).fill('.'))
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width / 2; x++) {
			if (templates.losange(x, y, width, height) < Math.random()) {
				if (Math.random() > 0.9) color = randomColor()
				sprite[y][Math.floor(width / 2) - x - (width % 2 === 0 ? 1 : 0)] = color
				sprite[y][Math.floor(width / 2) + x] = color
			}
		}
	}
	return addOutline(sprite)
		.map((el) => el.join(''))
		.join('\n')
}

/** @type {Record<string,(x:number, y:number, width:number, height: number)=>number>} */
const templates = {
	circle(x, y, width, height) {
		return (
			Math.sqrt(x ** 2 + (y - height / 2) ** 2) /
			Math.sqrt((width / 2) ** 2 + (height / 2) ** 2)
		)
	},
	losange(x, y, width, height) {
		return (x + Math.abs(y - height / 2)) / (width / 2 + height / 2)
	},
	rect(x, _, width, __) {
		return x / (width * 0.5)
	},
}

function randomColor() {
	return Math.floor(Math.random() * 8) + 2
}

/**
 * @param{string[][]} sprite
 */
function addOutline(sprite) {
	return sprite.map((r, y) =>
		r.map((c, x) => {
			if (c === '.') return c
			let count = 0
			for (let dy = -1; dy <= 1; dy += 2) {
				for (let dx = -1; dx <= 1; dx += 2) {
					const cell = sprite[y + dy]?.[x + dx]
					if (cell === undefined || cell === '.') count++
				}
			}
			if (count > 1) return '0'
			return c
		}),
	)
}
