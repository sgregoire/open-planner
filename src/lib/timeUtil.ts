import moment from 'moment';
import type { Occurence } from '../model';
import { dayToMomentDate } from '../model/momentUtils';

export function isOverlapping(a: Occurence, b: Occurence) {
	const aDate = moment().day(dayToMomentDate(a.day));
	const aFrom = new Date(aDate.toDate().setHours(a.from.hour, a.from.minute, 0, 0));
	const aTo = new Date(aDate.toDate().setHours(a.to.hour, a.to.minute, 0, 0));

	const bDate = moment().day(dayToMomentDate(b.day));
	const bFrom = new Date(bDate.toDate().setHours(b.from.hour, b.from.minute, 0, 0));
	const bTo = new Date(bDate.toDate().setHours(b.to.hour, b.to.minute, 0, 0));

	// If an event ends before the other starts
	if (aTo <= bFrom || bTo <= aFrom) {
		return false;
	}

	return true;
}
