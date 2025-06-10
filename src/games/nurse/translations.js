const texts = {
	en: {
		go: "Let's get to work!",
		status: 'Status',
		hp: 'HP:      ',
		mood: 'Mood:    ',
		fullness: 'Fullness:',
		examine: 'Examine',
		chat: 'Chat',
		feed: 'Feed',
		care: 'Care',
		back: 'Back',
		'not-hungry': '"I\'m not hungry."',
		hungry: [
			'"I\'m hungry."',
			'"I\'m starving."',
			'"My stomach is growling."',
			'"I need to eat."',
			'"I\'m famished."',
			'"I\'m ravenous."',
			'"I could eat a horse."',
			'"I haven\'t eaten all day."',
			'"When do we eat?"',
		],
		'feels-good': ['"That feels good."', '"It’s bad, but it feels good!"'],
		death: [
			'No signs of life.',
			'One last breath... then silence.',
			'His journey ends here.',
			"There's nothing more we can do.",
			'Death has taken him.',
			'His body rests in an eerie stillness.',
		],
		check_health_critical: [
			'His condition is worrying.',
			'He can barely stand.',
			'Something doesn’t seem right.',
		],
		check_mood_critical: [
			'His gaze is heavy with sadness.',
			'A silent despair surrounds him.',
			'I feel a deep sadness.',
			"Good thing there's no window!",
			'Something weighs on his shoulders.',
			'The energy seems to have slowly faded.',
			'Like a shadow that won’t leave.',
		],
		talk: ['Vous parlez météo.', 'Vous en apprenez plus sur la philatélie.'],
		talk_good: [
			'The conversation seemed to do him good.',
			'It looked like he enjoyed the chat.',
			'I think talking helps him.',
			'A faint smile appeared during the exchange.',
			'His eyes lit up as we talked.',
			'At least I made him laugh.',
		],
		care_good: [
			'The treatment seems effective.',
			'The symptoms are visibly easing.',
		],
		care_bad: ['Something’s not right.', 'You notice a worrying change.'],
	},
	fr: {
		go: 'Au boulot!',
		status: 'Etat',
		hp: 'PV:      ',
		mood: 'Moral:   ',
		fullness: 'Satiété: ',
		examine: 'Ausculter',
		chat: 'Papoter',
		feed: 'Nourir',
		care: 'Soigner',
		back: 'Retour',
		'not-hungry': '"Je n\'ai pas faim."',
		hungry: [
			'"J\'ai faim."',
			'"Je meurs de faim."',
			'"Mon estomac crie famine."',
			'"Il faut que je mange."',
			'"Je suis affamé."',
			'"J\'ai une dalle de loup."',
			'"Je pourrais manger un boeuf."',
			'"Je n\'ai rien mangé de la journée."',
			'"On mange quand ?"',
		],
		'feels-good': [
			'"Ça fait du bien."',
			'"C\'est mauvais, mais ça fait du bien!"',
		],
		death: [
			'Aucun signe de vie.',
			'Un dernier souffle... puis le silence.',
			"Son voyage s'arrête ici.",
			'On ne peut plus rien faire.',
			"La mort l'a emporté.",
			'Son corps repose dans une étrange quiétude.',
		],
		check_health_critical: [
			'Son état est préoccupant.',
			'Il tient à peine debout.',
			'Quelque chose ne tourne pas rond.',
		],
		check_mood_critical: [
			'Son regard est lourd de tristesse.',
			"Un désespoir silencieux l'entoure.",
			'Je sens une grande tristesse.',
			"Heureusement qu'il n'y a pas de fenêtre!",
			'Quelque chose pèse sur ses épaules.',
			"L'énergie semble s'être retirée peu à peu.",
			'Comme une ombre qui ne veut plus partir.',
		],
		talk: ['Vous parlez météo.', 'Vous en apprenez plus sur la philatélie.'],
		talk_good: [
			'Il semble que la conversation lui a fait du bien.',
			'On dirait que ça lui a fait plaisir de discuter.',
			'Je pense que parler lui fait du bien.',
			"Un léger sourire est apparu au fil de l'échange.",
			'Ses yeux se sont éclairés au fil de la discussion.',
			"Au moins, vous l'avez fait rire.",
		],
		care_good: [
			'Le traitement semble efficace.',
			"Les symptômes s'atténuent visiblement.",
		],
		care_bad: [
			'Quelque chose cloche.',
			'Vous remarquez un changement inquiétant.',
		],
	},
}

/**
 * @type {keyof typeof texts}
 */
let lang = 'fr'

/**
 * @param{keyof typeof texts} value
 */
export function setLang(value) {
	lang = value
}

/**
 * @param {keyof typeof texts['en']} key
 * @returns {string}
 */
export function t(key) {
	const res = texts[lang][key] ?? key
	if (typeof res === 'string') return res
	return res[Math.floor(Math.random() * res.length)]
}
