import { createGame } from 'odyc'

const fragment = `
precision mediump float;
uniform sampler2D u_texture;
uniform float u_opacity;
varying vec2 v_texCoords;

void main() {
  vec4 color = texture2D(u_texture, v_texCoords);
  gl_FragColor = vec4(color.rgba * u_opacity);
}
`
let opacity = 1

const game = createGame({
	filter: {
		fragment,
		settings: {
			opacity: 1,
		},
	},
	title: ['<4>Little Square<4>', 'He went to meet it'],
	player: {
		sprite: 3,
		position: [3, 1],
	},
	templates: {
		x: {
			sprite: 5,
			async onCollide(t) {
				t.remove()
				await game.openMessage('He woke up alone')
				setTimeout(async () => {
					await game.openMessage('And walked for long seconds')
					setTimeout(async () => {
						opacity *= 0.6
						await game.openMessage('Suddenly, he felt life leaving him')
					}, 6000)
				}, 2500)
			},
		},
		'.': {
			solid: false,
			onEnter() {
				if (opacity === 1 || opacity === 0) return
				opacity *= 0.9
				if (opacity < 0.01) opacity = 0
				game.updateFilter({
					opacity,
				})
			},
		},
		1: {
			onCollide() {
				const [x, y] = game.player.position
				game.player.position = [x, y + 29]
			},
		},
		2: {
			onCollide() {
				const [x, y] = game.player.position
				game.player.position = [x - 29, y]
			},
		},
		3: {
			onCollide() {
				const [x, y] = game.player.position
				game.player.position = [x, y - 29]
			},
		},
		4: {
			onCollide() {
				const [x, y] = game.player.position
				game.player.position = [x + 29, y]
			},
		},
	},
	map: `
	11111111111111111111111111111111
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............x...............2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	4..............................2
	33333333333333333333333333333333
			`,
	screenWidth: 32,
	screenHeight: 32,
	background: 0,
})
