import { Day } from './root';

export function dayToMomentDate(d: Day): number {
	switch (d) {
		case Day.Mo:
			return 1;
		case Day.Tu:
			return 2;
		case Day.We:
			return 3;
		case Day.Th:
			return 4;
		case Day.Fr:
			return 5;
		case Day.Sa:
			return 6;
		case Day.Su:
			return 0;
	}
}

export function momentDateToDay(day: number): Day {
	switch (day) {
		case 1:
			return Day.Mo;
		case 2:
			return Day.Tu;
		case 3:
			return Day.We;
		case 4:
			return Day.Th;
		case 5:
			return Day.Fr;
		case 6:
			return Day.Sa;
		default:
			return Day.Su;
	}
}
