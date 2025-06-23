import { charToSprite, createGame, mergeSprites, vec2 } from 'odyc'
import { levels, prepareMap } from './levels'
import { levelIntro } from './levelIntro'

// # -> wall
// x -> goal
// . -> empty
// O -> box
// & -> box on goal square

/**
 * @param {number} levelIndex
 */
export function sokoban(levelIndex) {
	const { map, playerPosition, screenWidth, screenHeight } = prepareMap(
		levels[levelIndex],
	)
	/**@type {(()=>void)[]}*/
	let history = []

	const game = createGame({
		player: {
			sprite: charToSprite('@'),
			position: playerPosition,
			onInput(input) {
				if (input === 'ACTION') history.pop()?.()
			},
		},
		templates: {
			'#': {
				sprite: charToSprite('#'),
				solid: true,
			},
			x: {
				sprite: charToSprite('x'),
				solid: false,
				onEnter: playerMove,
			},
			'.': {
				sprite: charToSprite('.'),
				solid: false,
				onEnter: playerMove,
			},
			O: {
				sprite: charToSprite('O'),
				solid: true,
				onCollide: push,
			},
			'&': {
				sprite: mergeSprites(charToSprite('x'), charToSprite('O')),
				solid: true,
				onCollide(target) {
					push(target, true)
				},
			},
		},
		controls: {
			LEFT: ['ArrowLeft', 'KeyA'],
			RIGHT: ['ArrowRight', 'KeyD'],
			UP: ['ArrowUp', 'KeyW'],
			DOWN: ['ArrowDown', 'KeyS'],
			ACTION: ['KeyU'],
		},
		map,
		screenWidth,
		screenHeight,
		filter: {
			// name: 'crt',
		},
	})

	function playerMove() {
		const playerPos = vec2(game.player.position).sub(
			game.player.direction,
		).value
		history.push(() => {
			game.player.position = playerPos
		})
	}

	/**
	 * @param{import('odyc').EventTarget<'O'|'&'>} target
	 * @param{boolean} isGoal
	 */
	function push(target, isGoal = false) {
		const pos = vec2(target.position)
		const dest = pos.add(game.player.direction)
		const nextCell = game.getCell(...dest.value)
		const playerPos = vec2(game.player.position)
		if (['#', 'O', '&'].includes(nextCell.symbol)) {
			game.playSound('HIT', 42)
		} else if (nextCell.symbol === 'x') {
			game.player.position = pos.value
			game.addToCell(pos.x, pos.y, isGoal ? 'x' : '.')
			game.addToCell(dest.x, dest.y, '&')
			history.push(() => {
				game.player.position = playerPos.value
				game.addToCell(pos.x, pos.y, 'O')
				game.addToCell(dest.x, dest.y, 'x')
			})
			if (game.getAll('x').length === 0) {
				game.playSound('POWERUP', 42)
				levelIndex = (levelIndex + 1) % levels.length
				levelIntro(levelIndex)
			}
			return
		} else {
			game.player.position = pos.value
			game.addToCell(pos.x, pos.y, isGoal ? 'x' : '.')
			game.addToCell(dest.x, dest.y, 'O')
			history.push(() => {
				game.player.position = playerPos.value
				game.addToCell(pos.x, pos.y, 'O')
				game.addToCell(dest.x, dest.y, '.')
			})
		}
	}
}
