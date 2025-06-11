import { createGame } from 'odyc'
import { chance, clamp, genSprite, getStatusText, pick, randInt } from './utils'
import { getLang, t, texts } from './translations'

let turn = 0
let tipIndex = -1

const game = createGame({
	background: 2,
	player: {
		sprite: `
			...33...
			..3333..
			..0880..
			.303303.
			3.3333.3
			8.3333.8
			..3..3..
			..0..0..
			`,
		position: [9, 23],
	},
	templates: {
		c: () => {
			const c = pick(8, 9, 5)
			const h = pick(0, 1, 6)
			const tips = texts[getLang()].tips
			tipIndex = (tipIndex + 1) % tips.length
			let hasTalk = false
			return {
				sprite: `
			...33...
			..3333..
			..${h}${c}${c}${h}..
			.3${h}33${h}3.
			3.3333.3
			${c}.3333.${c}
			..3..3..
			..0..0..
			`,

				onScreenLeave(target) {
					if (hasTalk) target.remove()
				},

				onCollide() {
					game.openDialog(texts[getLang()].tips[tipIndex])
					hasTalk = true
				},
			}
		},
		h: {
			sprite: `
			11111111
			11114111
			11114111
			11114444
			11114111
			11114111
			11111111
			11111111
			`,
		},
		H: {
			sprite: `
			11111111
			11141111
			11141111
			44441111
			11141111
			11141111
			11111111
			11111111
			`,
		},
		d: {
			sprite: 0,
			onCollide() {
				const [x] = game.player.position
				game.player.position = [x, 16]
			},
		},
		D: { sprite: 0, dialog: "Ce n'est pas encore l'heure de partir" },
		x: {
			sprite: 1,
		},
		b: {
			sprite: `
		  99999999
		  92222229
		  12222221
		  12222221
		  11111111
		  77777777
		  77777777
		  77777777
	  `,
		},
		B: {
			sprite: `
		  77777777
		  77777777
		  99999999
		  9......9
		  ........
		  ........
		  ........
		  ........
		  ........
	  `,
			solid: false,
		},
		'<': {
			sprite: `
			00......
			00......
			00......
			00......
			00......
			00......
			00......
			00......
			`,
			solid: false,
		},
		'>': {
			sprite: `
			......00
			......00
			......00
			......00
			......00
			......00
			......00
			......00
			`,
			solid: false,
		},
		t: () => {
			const tvOn = `
			11111111
			00000000
			07722660
			06072550
			00805560
			08885880
			00000000
			11111111
			`
			const tvOff = ` 
			11111111
			00000000
			02222220
			02222220
			02222220
			02222220
			00000000
			11111111
			`
			return {
				sprite: pick(tvOn, tvOff),
				sound: ['BLIP', 36],
				onCollide(t) {
					t.sprite = t.sprite === tvOn ? tvOff : tvOn
				},
			}
		},
		f: {
			sprite: `
			........
			...717..
			.171517.
			15171717
			.1717151
			..15171.
			...199..
			...999..
			`,
		},
		'.': {
			solid: false,
			onCollide() {
				turn++
			},
		},
		p: patient,
	},
	map: `
  xxxxxx  xxxxxx  xxxxxx
  xb...x  x....x  x...bx
  xB...x  x....x  x...Bx
  x.p..>  <....>  <....x
  x....x  x....x  x..p.x
  xxtxxx  x....x  xxtxxx

  xxxxxx  x....x  xxxxxx
  xb...x  x...cx  x.p.bx
  xB...>  <....>  <...Bx
  x..p.x  x....x  x....x
  x....x  x....x  x..f.x
  xxxxxx  x....x  xxxxxx

  xxxxxx  x....x  xxtxxx
  xb..fx  x....x  x...bx
  xB...>  <....>  <...Bx
  x..p.x  x....x  x.p..x
  x....x  x....x  x....x
  xxxxxx  xxDDxx  xxxxxx


  xxxxxx	.xhHx.  xxxxxx
	xxxxxx	xxxxxx  xxxxxx
  xxxxxx	xxddxx  xxxxxx
  xxxxxx	......  xxxxxx
  xxxxxx	......  xxxxxx
  xxxxxx	......  xxxxxx
  `,
	screenWidth: 6,
	screenHeight: 6,
})

/**@returns {import('odyc').Template<'p'>}*/
function patient() {
	{
		let hp = randInt(15, 60)
		let mood = randInt(15, 100)
		let fullness = randInt(80, 100)

		let lastTurn = 0

		const update = () => {
			const delay = ++turn - lastTurn
			lastTurn = turn

			fullness -= delay

			if (chance(1 - hp / 100) || chance(1 - mood / 100))
				hp -= randInt(2 * delay)

			if (chance(1 - hp / 100) || chance(1 - mood / 100))
				mood -= randInt(2 * delay)

			// Severe hunger causes health and happiness to decline
			if (fullness < 25) {
				hp -= delay
				mood -= delay
			}

			clampValues()
		}

		const examine = async () => {
			const message = [
				t('hp') + makeBar(hp),
				t('mood') + makeBar(mood),
				t('fullness') + makeBar(fullness),
			].join('\n\n')
			game.openMessage(message)
		}

		/**
		 * @param {number} value
		 */
		const makeBar = (value) => {
			value = clamp(0, value, 100)
			const fullBar = '██████████'
			const color = getStatusText(value, ['<4>', '<6>', '<5>', '<7>'])
			const score = Math.round(value / fullBar.length)
			return color + fullBar.slice(0, score).padEnd(fullBar.length, '░') + color
		}

		const feed = async () => {
			if (fullness >= 90) {
				await game.openDialog(t('not-hungry'))
				mood -= randInt(10)
				return
			}
			fullness = 100
			await game.openDialog(t('feels-good'))
		}

		const chat = async () => {
			let dialog = [t('talk')]

			const goodTalk = chance(9 / 10) || chance(mood / 100)

			if (goodTalk) {
				mood += randInt(5, 20)
				dialog.push(t('talk_good'))
			}

			await game.openDialog(dialog.join('|'))
		}

		const care = async () => {
			const good = chance(14 / 15)
			if (good) {
				hp += randInt(15, 25)
				await game.openDialog(t('care_good'))
			} else {
				hp = Math.max(hp - 5, hp / 2)
				await game.openDialog(t('care_bad'))
			}
		}

		const clampValues = () => {
			hp = clamp(0, hp, 100)
			mood = clamp(0, mood, 100)
			fullness = clamp(0, fullness, 100)
		}

		/**
		 * @param {import('odyc').EventTarget} target
		 */
		const checkDeath = (target) => {
			if (hp > 0) return false
			game.playSound('FALL', 93)
			game.openMessage(t('death'))
			target.remove()
			return true
		}

		return {
			sprite: genSprite(8, 8),
			async onScreenEnter() {
				game.getAll('c').forEach((el) => el.remove())
				game.addToCell(pick(7, 10), pick(2, 4, 7, 9, 13, 15), 'c')

				/**@type {string[]}*/
				let dialog = []

				update()

				if (fullness < 50) dialog.push(t('hungry'))
				if (hp < 30) dialog.push(t('check_health_critical'))
				if (mood < 30) dialog.push(t('check_mood_critical'))

				if (dialog.length) await game.openDialog(dialog.join('|'))
			},
			async onCollide(target) {
				if (checkDeath(target)) return
				update()

				await game.openMenu({
					[t('examine')]: examine,
					[t('chat')]: chat,
					[t('feed')]: feed,
					[t('care')]: care,
					[t('back')]: null,
				})
				checkDeath(target)
				clampValues()
			},
		}
	}
}
