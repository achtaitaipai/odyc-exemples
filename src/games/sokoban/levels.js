export const levels = [
	// Level 1 - Single box
	`
#####
#...#
#@Ox#
#...#
#####
	`,

	// Level 2 - Two boxes
	`
#######
#.....#
#.OO@x#
#.....#
#######
	`,

	// Level 3 - Corner push
	`
#######
#..x..#
#.O@O.#
#..x..#
#######
	`,

	// Level 4 - Simple maze
	`
#########
#...@...#
#.#.#.#.#
#.O...O.#
#.#.#.#.#
#...x...#
#.#...#.#
#...x...#
#########
	`,

	// Level 5 - Line formation
	`
_______####
########..##
#..........###
#.@OO.##...xx#
#.OO...##..xx#
#.........####
###########
	`,
]

/**
 * @param {string} rawMap
 * @returns {{map: string, playerPosition: [number, number], screenWidth: number, screenHeight: number}}
 */
export function prepareMap(rawMap) {
	const lines = rawMap
		.split('\n')
		.map((line) => line.replace(/\t/g, ''))
		.filter((line) => line.trim() !== '')

	/**@type {[number,number]}*/
	let playerPosition = [0, 0]
	const cleanedLines = lines.map((line, y) => {
		const trimmedLine = line.trim()
		const playerIndex = trimmedLine.indexOf('@')
		if (playerIndex !== -1) {
			playerPosition = [playerIndex, y]
			return trimmedLine.replace('@', '.')
		}
		return trimmedLine
	})

	const screenWidth = Math.max(...cleanedLines.map((line) => line.length))
	const screenHeight = cleanedLines.length

	return {
		map: cleanedLines.join('\n'),
		playerPosition,
		screenWidth,
		screenHeight,
	}
}
