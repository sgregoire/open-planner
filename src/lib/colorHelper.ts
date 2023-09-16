import type { Color } from '../model';

export function colorToRgb(color: Color | undefined) {
	if (color) {
		return `rgb(${color.red}, ${color.green}, ${color.blue})`;
	}
	return 'white';
}
