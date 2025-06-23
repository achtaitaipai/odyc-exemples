import { createGame } from 'odyc'
import { levelIntro } from './levelIntro'

let levelIndex = 0

async function intro() {
	const game = createGame()
	await game.openMessage(
		'Sokoban',
		`
arrow keys to move

u to undo
`,
	)
	levelIntro(levelIndex)
}

intro()
