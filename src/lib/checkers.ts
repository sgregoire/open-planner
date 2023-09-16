import type { Color, Day, EventType, Occurence, Root, Time, Timeframe } from "../model/root";

export function reduceCheckResults(values: boolean[]): boolean {
    return values.reduce((value, current) => value && current, true)
}

export function betweenCheck(value: number, min: number, max: number) {
    return value >= min && value <= max;
}

export function nonEmptyString(value: string) {
    return value.trim().length > 0
}

export function hexCheck(value: number) {
    return betweenCheck(value, 0, 255);
}

export function colorChecker(color: Color) {
    return hexCheck(color.red)
        && hexCheck(color.green)
        && hexCheck(color.blue)    
}

export function timeframeChecker(timeframe: Timeframe) {
    return timeframe.from <= timeframe.to
}

export function tagsChecker(values: ReadonlyArray<string>) {
    return reduceCheckResults(values.map(nonEmptyString))
        // No duplicate
        && new Set(values).size == values.length
}

export function timeChecker(time: Time) {
    return betweenCheck(time.hour, 0, 23)
        && betweenCheck(time.minute, 0, 59)
}

export function occurenceChecker(occurence: Occurence) {
    return timeChecker(occurence.from)
        && timeChecker(occurence.to);
}

export function eventTypeChecker(eventType: EventType) {
    return nonEmptyString(eventType.name)
        && tagsChecker(eventType.tags)
        && eventType.color ? colorChecker(eventType.color) : true
        && reduceCheckResults(eventType.exceptions.map(timeframeChecker))
        && reduceCheckResults(eventType.occurences.map(occurenceChecker))
}

export function rootChecker(root: Root) {
    return timeframeChecker(root.timeframe) 
        && reduceCheckResults(root.exceptions.map(timeframeChecker))
        && reduceCheckResults(root.eventTypes.map(eventTypeChecker))

}