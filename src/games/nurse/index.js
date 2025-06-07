import { createGame } from 'odyc'
import { chance, genSprite, pick, randInt } from './utils'
import { DIALOGUES_EN, DIALOGUES_FR } from './dialogues'

let time = 0

const game = createGame({
	background: 2,
	player: {
		sprite: `
			...33...
			..3333..
			..9889..
			.393393.
			3.3333.3
			8.3333.8
			..3..3..
			..0..0..
			`,
		position: [3, 9],
	},
	templates: {
		x: {
			sprite: 1,
		},
		v: {
			sprite: `
      .
      .
      .
      .
      .
      .
      00000000
      00000000
      `,
			solid: false,
		},
		'^': {
			sprite: `
      00000000
      00000000
      .
      .
      .
      .
      .
      .
      `,
			solid: false,
		},
		p: () => {
			let health = randInt(15, 60)
			let happiness = randInt(15, 70)
			let lastUpdate = 0
			return {
				sprite: genSprite(8, 8),
				async onCollide(target) {
					if (health <= 0 || happiness <= 0) {
						game.playSound('FALL', 68)
						target.remove()
						await game.openMessage(pick(...DIALOGUES.death))

						return
					}
					time++
					if (lastUpdate) {
						const delay = (time - lastUpdate) * 10
						if (!chance(health / 100)) health -= randInt(delay)
						if (!chance(happiness / 100)) health -= randInt(delay)
						if (!chance(health / 100)) happiness -= randInt(delay)
						if (!chance(happiness / 100)) happiness -= randInt(delay)
					}
					lastUpdate = time
					const choice = await game.prompt(...DIALOGUES.menu)
					switch (choice) {
						case 0:
							check(health, happiness)
							break
						case 1:
							const goodTalk = chance((health + happiness) / 100)
							if (goodTalk) {
								happiness += 15
							} else {
								happiness -= 10
							}
							talk(goodTalk)
							break
						case 2:
							const goodCare = chance((health + happiness) / 50)
							if (goodCare) {
								health += 10
								happiness += 10
							}
							takeCare(goodCare)
							break
						case 3:
							const goodMedicate = chance(Math.min(0.9, (health / 100) * 1.9))
							if (goodMedicate) health += 15
							else health = Math.max(Math.floor(health / 4), health - 50)
							medicate(goodMedicate)
							break
					}
				},
			}
		},
	},
	map: `
  xxxxxxxxxxxxxxxxxxxxxxxx
  x....xx....xx..p.xx....x
  x..p.xx....xx....xx....x
  x....xx.p..xx....xx.p..x
  x....xx....xx....xx....x
	xxxvxxxxxvxxxxxvxxxxxvxx
	xxx^xxxxx^xxxxx^xxxxx^xx
	x......................x
	x......................x
	x......................x
	x......................x
	xxxvxxxxxvxxxxxvxxxxxvxx
	xxx^xxxxx^xxxxx^xxxxx^xx
  x.p..xx....xx....xx....x
  x....xx....xx.p..xx....x
  x....xx....xx....xx.p..x
  x....xx.p..xx....xx....x
  xxxxxxxxxxxxxxxxxxxxxxxx
	`,
	screenWidth: 6,
	screenHeight: 6,
})
let DIALOGUES = DIALOGUES_EN
game.prompt('English', 'Français').then((res) => {
	if (res === 1) DIALOGUES = DIALOGUES_FR
})

/**
 *@param{boolean}good
 */
function talk(good) {
	let dialog = ''

	if (good) {
		dialog += pick(...DIALOGUES.talk_good)
	} else {
		dialog += pick(...DIALOGUES.talk_bad)
	}

	return game.openDialog(dialog)
}

/**
 *@param{number}health
 *@param{number}happiness
 */
function check(health, happiness) {
	let dialog = ''
	if (health > 75) dialog += pick(...DIALOGUES.check_health_high)
	else if (health > 50) dialog += pick(...DIALOGUES.check_health_mid)
	else if (health > 25) dialog += pick(...DIALOGUES.check_health_low)
	else dialog += pick(...DIALOGUES.check_health_critical)

	dialog += '|'

	if (happiness > 75) dialog += pick(...DIALOGUES.check_mood_high)
	else if (happiness > 50) dialog += pick(...DIALOGUES.check_mood_mid)
	else if (happiness > 25) dialog += pick(...DIALOGUES.check_mood_low)
	else dialog += pick(...DIALOGUES.check_mood_critical)

	return game.openDialog(dialog)
}

/**
 * @param {boolean} good
 */
function takeCare(good) {
	let dialog = ''

	if (good) {
		dialog += pick(...DIALOGUES.care_good)
	} else {
		dialog += pick(...DIALOGUES.care_bad)
	}

	return game.openDialog(dialog)
}

/**
 * @param {boolean} good
 */
function medicate(good) {
	let dialog = ''

	if (good) {
		dialog += pick(...DIALOGUES.medicate_good)
	} else {
		dialog += pick(...DIALOGUES.medicate_bad)
	}

	return game.openDialog(dialog)
}
