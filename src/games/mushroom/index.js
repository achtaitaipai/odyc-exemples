import { createGame, createSound } from 'odyc'
const fragment = `
precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texCoords;

uniform float u_count;
uniform float u_intensity;

void main() {
  vec2 uv = vec2(0.);
  uv.x = v_texCoords.x +sin(v_texCoords.y * u_count) *.1 * u_intensity;
  uv.y = v_texCoords.y +sin(v_texCoords.x * u_count) *.1 * u_intensity;
  gl_FragColor = texture2D(u_texture, uv);
}
`
const TIME_BEFORE_LOSE = 3000
let score = 0
/** @type number */
let timeoutInterval

const settings = {
	count: 30,
	intensity: 0,
}

/**
 * @param position {[number,number]}
 * @return {[number,number]}
 */
function randomPosition(position) {
	let [x, y] = position
	let [newX, newY] = [x, y]
	while (
		(newX === x && newY === y) ||
		(newX === game.player.position[0] && newY === game.player.position[1])
	)
		[newX, newY] = [
			Math.floor(Math.random() * 7 + 1),
			Math.floor(Math.random() * 7 + 1),
		]
	return [newX, newY]
}

const game = createGame({
	player: {
		sprite: `
		...99...
		...55...
		.111111.
		5.1111.5
		5.1111.5
		..3333..
		..3..3..
		..9..9..
	`,
		position: [2, 2],
	},

	templates: {
		x: {
			sprite: `
      00000000
      09990999
      09990999
      00000000
      99099909
      00000000
      99909990
      99909990
    `,
		},
		o: {
			sprite: `
		..1414..
		.144441.
		44414444
		44441444
		14444441
		...55...
		...55...
		...55...
	`,
			sound: createSound('BLIP', 5353),
			onCollide: function (target) {
				target.remove()
				game.addToCell(...randomPosition(target.position), 'o')
				settings.intensity =
					settings.intensity === 0 ? 0.1 : settings.intensity * -1.1
				clearTimeout(timeoutInterval)
				score++
				timeoutInterval = setTimeout(() => {
					const text = `GAME OVER\n\nscore: ${score}`
					score = 0
					settings.intensity = 0
					game.end(text)
				}, TIME_BEFORE_LOSE)
			},
		},
	},
	map: `
  xxxxxxxxx
  x.......x
  x.......x
  x.......x
  x...o...x
  x.......x
  x.......x
  x.......x
  xxxxxxxxx
  `,
	background: 0,
	screenWidth: 9,
	screenHeight: 9,
	filter: {
		fragment,
		settings,
	},
	title: '>> Mushroom <<',
})
