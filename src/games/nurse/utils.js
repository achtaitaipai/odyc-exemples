/**
 * Returns true with the given probability (ratio), false otherwise.
 *
 * @param {number} ratio - A number between 0 and 1 representing the probability of returning true.
 * @returns {boolean} True with the given probability.
 */
export function chance(ratio = 0.5) {
	return Math.random() < ratio
}

/**
 * @param {number}min
 * @param {number}value
 * @param {number}max
 */
export function clamp(min, value, max) {
	return Math.max(min, Math.min(value, max))
}

/**
 *
 * @param {number} min
 * @param {number} [max]
 * @returns {number}
 */
export function randInt(min, max) {
	const range = !!max ? max - min : min
	return Math.floor(Math.random() * (range + 1)) + (!!max ? min : 0)
}

/**
 * Picks a random element from an array.
 *
 * @template T
 * @param {T[]} array - The array to pick from.
 * @returns {T} A randomly selected element from the array.
 * @throws {Error} If the array is empty.
 */
export function pick(...array) {
	if (array.length === 0) {
		throw new Error('Array must not be empty.')
	}
	const index = Math.floor(Math.random() * array.length)
	return array[index]
}

/**
 *@param {number} value
 *@param {string[]} texts
 */
export function getStatusText(value, texts) {
	const index = clamp(
		0,
		Math.floor((value / 100) * texts.length),
		texts.length - 1,
	)
	return texts[index]
}

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
