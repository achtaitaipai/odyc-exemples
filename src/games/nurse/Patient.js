import { genSprite, pick, randInt } from './utils'

/**@type {Map<string,Patient>}*/
const patients = new Map()

/**
 * @param {import('odyc').EventTarget} target
 */
export function initPatient(target) {
	patients.set(target.position.join(''), new Patient(target))
}

const names = [
	"Xar'Zhul",
	'Vornak',
	'Elithar',
	'Droq-Nar',
	'Yllvex',
	"Tzu'Quor",
	"Ka'rith",
	'Zheen',
	'Molgrin',
	"Aq'tuun",
	'Veltrix',
	'Omnari',
	'Syr-Zek',
	"N'Krell",
	'Jharnak',
	'Eryvax',
	"Tul'Zar",
	'Ormek',
	'Zyrral',
	"Ph'raxis",
]

/**
 *@returns {import('odyc').Template}
 */
export function patient() {
	const health = randInt(15, 90) / 100
	const cleaness = randInt(15, 90) / 100
	const happiness = randInt(15, 90) / 100
	const pain = 1 - randInt(15, 90) / 100
	const name = pick(...names)
	return {
		sprite: 5,
	}
}

export class Patient {
	/**@type {number}*/
	health
	/**@type {number}*/
	cleaness
	/**@type {number}*/
	happiness
	/**@type {number}*/
	pain
	/**@type {string}*/
	name

	/**
	 * @param {import('odyc').EventTarget} target
	 */
	constructor(target) {
		this.health = randInt(15, 90) / 100
		this.cleaness = randInt(15, 90) / 100
		this.happiness = randInt(15, 90) / 100
		this.pain = 1 - randInt(15, 90) / 100
		this.name = pick(...names)
		target.sprite = genSprite(8, 8)
	}
}
