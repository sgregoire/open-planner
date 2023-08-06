import type { Root, Timeframe } from "../model";

// TODO @sgregoire: To be removed from internal model
const dayMapper = {
    "Mo": 1,
    "Tu": 2,
    "We": 3,
    "Th": 4,
    "Fr": 5,
    "Sa": 6,
    "Su": 0,
}

function inTimeframes(date: moment.Moment, timeframes: readonly Timeframe[]) {
    return timeframes.map(it => date.isBetween(it.from, it.to)).some((it) => it === true)
}

export function matchingEvents(date: moment.Moment, root: Root) {
    return root.eventTypes
        // Only if the event is in the right timeframe
        .filter(it => date.isBetween(it.timeframe.from, it.timeframe.to))
        // Only if we are on the right day
        .filter(it => it.occurences.map(occ => occ.day).map(day => dayMapper[day]).includes(date.day()))
        // Exclude the overall exceptions
        .filter(() => !inTimeframes(date, root.exceptions))
        // Exclude the exceptions
        .filter(it => !inTimeframes(date, it.exceptions));
}