import type { Root, Timeframe } from '../model';
import { dayToMomentDate } from '../model/momentUtils';

function inTimeframes(date: moment.Moment, timeframes: readonly Timeframe[]) {
	return timeframes.map((it) => date.isBetween(it.from, it.to)).some((it) => it === true);
}

export function matchingEvents(date: moment.Moment, root: Root) {
	return (
		root.eventTypes
			// Only if the event is in the right timeframe
			.filter((it) => date.isBetween(it.timeframe.from, it.timeframe.to))
			// Only if we are on the right day
			.filter((it) =>
				it.occurences.map((occ) => occ.day).map((day) => dayToMomentDate(day) == date.day())
			)
			// Exclude the overall exceptions
			.filter(() => !inTimeframes(date, root.exceptions))
			// Exclude the exceptions
			.filter((it) => !inTimeframes(date, it.exceptions))
	);
}
