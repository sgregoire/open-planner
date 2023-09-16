import type { Color } from '../model';

const maxAmount = 0xff;

const colorKeys: Array<keyof Color> = ['red', 'green', 'blue'];
export function generateColors(nbColor: number): Color[] {
	const steps = Math.ceil(nbColor / 3);
	const colorIncrement = Math.trunc(maxAmount / steps + 1) - 1;

	const res = [];
	for (let i = 0; i < steps; i++) {
		const max = i == steps ? nbColor - steps * i : 3;
		const colorValue = colorIncrement * (i + 1);
		for (let j = 0; j < max; j++) {
			// Computes the next color
			const color = {
				red: maxAmount,
				green: maxAmount,
				blue: maxAmount
			};
			color[colorKeys[j]] = colorValue;
			res.push(color);
		}
	}
	return res;
}
