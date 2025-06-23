import { createGame } from 'odyc'
import { levels } from './levels'
import { sokoban } from './sokoban'

/**
 * @param {number} levelIndex
 */
export async function levelIntro(levelIndex) {
	const game = createGame()
	await game.openMessage(`level: ${levelIndex + 1} / ${levels.length}`)
	sokoban(levelIndex)
}
