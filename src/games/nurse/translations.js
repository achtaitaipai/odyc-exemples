const texts = {
	en: {
		go: "Let's go",
		status: 'Status',
		hp: 'HP:       ',
		mood: 'Mood:     ',
		fullness: 'Fullness: ',
		examine: 'Examine',
		chat: 'Chat',
		feed: 'Feed',
		care: 'Care',
		back: 'Back',
		'not-hungry': "I'm not hungry",
		hungry: [
			"I'm hungry.",
			"I'm starving.",
			'"I could eat a horse."',
			'"My stomach is growling."',
			'"I need food."',
			'"I\'m famished."',
			'"I\'m feeling peckish."',
			'"I haven\'t eaten all day."',
			'"Time to eat!"',
		],
		'feels-good': ['"It feels good."', '"It\'s bad, but it feels good."'],
		death: [
			"He's gone.",
			'No signs of life remain.',
			'A final breath... and then, silence.',
			'His journey ends here.',
			'Nothing more can be done.',
			'Death has claimed him.',
			'A stillness settles over his body.',
		],
		check_health_high: [
			'He looks healthy and well.',
			'He seems to be in good shape.',
			'He appears fit and full of energy.',
		],
		check_health_mid: [
			'He seems a bit worn, but holding up.',
			'He looks tired, but nothing too serious.',
			"He's doing okay, all things considered.",
		],
		check_health_low: [
			"He's clearly not feeling his best.",
			'He looks pale and unsteady.',
			"There's a heaviness in his movements.",
		],
		check_health_critical: [
			'His condition is worrying.',
			"He's barely standing.",
			'Something is seriously wrong with him.',
		],
		check_mood_high: [
			"There's a spark in his eyes.",
			'He carries a lightness in his voice.',
			'A quiet confidence radiates from him.',
		],
		check_mood_mid: [
			'He manages to keep his chin up.',
			'Despite everything, his mood seems steady.',
			'A faint smile lingers on his face.',
		],
		check_mood_low: [
			'Something feels off in his expression.',
			'He seems distracted, distant.',
			"There's a shadow behind his gaze.",
		],
		check_mood_critical: [
			'He seems lost in dark thoughts.',
			'His eyes are heavy with sadness.',
			'Despair clings to him like a fog.',
		],
		talk_good: [
			'He seems to have appreciated the moment.',
			'A quiet smile lingers on his face.',
			'He nods slowly, as if comforted.',
			'You notice a sense of ease in him now.',
		],
		care_good: [
			'The treatment seems to be working.',
			'He breathes a little easier now.',
			'His symptoms are already fading.',
			'You can see a bit of strength returning to him.',
			'He nods with a faint sense of relief.',
		],
		care_bad: [
			"Something doesn't feel right.",
			"His condition isn't improving… quite the opposite.",
			'You notice a worrying change in his expression.',
			"The treatment doesn't seem to take effect.",
			'A sense of unease settles in the air.',
		],
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
		check_health_high: [
			'Il semble en pleine forme.',
			'Son état physique est excellent.',
			'Il dégage une belle vitalité.',
		],
		check_health_mid: [
			"Il a l'air un peu fatigué, mais ça va.",
			"Quelques signes d'usure, rien de grave.",
			"Dans l'ensemble, son état reste acceptable.",
		],
		check_health_low: [
			"Il n'a clairement pas bonne mine.",
			'Sa démarche est hésitante.',
			'Il semble affaibli.',
		],
		check_health_critical: [
			'Son état est préoccupant.',
			'Il tient à peine debout.',
			'Quelque chose ne tourne pas rond.',
		],
		check_mood_high: [
			"Quelle énergie! On ne se croirait pas à l'hopital",
			"C'est ce qui s'appelle être solaire.",
			"Son regard pétille d'enthousiasme.",
			'On sent une belle vitalité intérieure.',
			'Son énergie est presque palpable.',
		],
		check_mood_mid: [
			'Un sourire persiste sur ses lèvres.',
			'Le moral semble au rendez-vous.',
			'On perçoit un calme rassurant.',
			'Un calme tempéré, à la lisière de la mélancolie.',
			'Son attitude évoque une forme de résilience tranquille.',
		],
		check_mood_low: [
			"Ce n'est pas la grande forme, mais on a vu pire.",
			'Son expression trahit un mal-être.',
			'On croirait que ce corps est inhabité.',
			'Une fatigue morale semble l’habiter.',
			'Le vide dans son regard en dit long.',
			'Chaque mot, chaque geste semble demander un effort.',
			'Comme un voile gris posé sur son humeur.',
		],
		check_mood_critical: [
			'Son regard est lourd de tristesse.',
			"Un désespoir silencieux l'entoure.",
			'Je sens une grande tristesse.',
			"Heureusement qu'il n'y a pas de fenêtre!",
			'Quelque chose pèse sur ses épaules.',
			"L'énergie semble s'être retirée peu à peu.",
			'Comme une ombre qui ne veut plus partir.',
			'Un léger sourire est apparu au fil de l’échange.',
			'Ses yeux se sont éclairés au fil de la discussion.',
			"Au moins, je l'aurai fait rire.",
		],
		talk_good: [
			'Il semble que la conversation lui a fait du bien.',
			'On dirait que ça lui a fait plaisir de discuter.',
			'Je pense que parler lui fait du bien.',
		],
		care_good: [
			'Le traitement semble efficace.',
			'Sa respiration se fait plus régulière.',
			"Les symptômes s'atténuent visiblement.",
			'Une part de son énergie revient.',
			'Il vous regarde avec un soupçon de soulagement.',
		],
		care_bad: [
			'Quelque chose cloche.',
			"Son état ne s'améliore pas… voire empire.",
			'Vous remarquez un changement inquiétant.',
			'Le traitement ne semble avoir aucun effet.',
			"Une tension étrange flotte dans l'air.",
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
