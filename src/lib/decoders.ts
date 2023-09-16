import { date, object, type Decoder, array, set, optional, string, oneOf, positiveInteger } from "decoders";
import type { Color, EventType, Occurence, Root, Time, Timeframe } from "../model/root";

export const timeframeDecoder: Decoder<Timeframe> = object({
    from: date,
    to: date,
});

export const timeDecoder: Decoder<Time> = {
    hour: positiveInteger,
    minute: positiveInteger,
}

export const occurenceDecoder: Decoder<Occurence> = object({
    day: oneOf(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']),
    from: timeDecoder,
    to: timeDecoder
})

export const colorDecoder: Decoder<Color> = object({
    red: positiveInteger,
    green: positiveInteger,
    blue: positiveInteger,
});

export const eventTypeDecoder: Decoder<EventType> = object({
    name: string,
    tags: set(string),
    color: optional(colorDecoder),
    timeframe: timeframeDecoder,
    exceptions: array(timeframeDecoder),
    occurences: array(occurenceDecoder)
})

export const rootDecoder: Decoder<Root> = object({
    timeframe: timeframeDecoder,
    eventTypes: array(eventTypeDecoder),
    exceptions: array(timeframeDecoder),
});