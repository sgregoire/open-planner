import { date, object, type Decoder, array, optional, string, oneOf, positiveInteger } from 'decoders';
import { Day, type Color, type EventType, type Occurence, type Root, type Time, type Timeframe } from '../model/root';

export const timeframeDecoder: Decoder<Timeframe> = object({
  from: date,
  to: date,
});

export const timeDecoder: Decoder<Time> = object({
  hour: positiveInteger,
  minute: positiveInteger,
});

export const occurenceDecoder: Decoder<Occurence> = object({
  day: oneOf([Day.Mo, Day.Tu, Day.We, Day.Th, Day.Fr, Day.Sa, Day.Su]),
  from: timeDecoder,
  to: timeDecoder,
});

export const colorDecoder: Decoder<Color> = object({
  red: positiveInteger,
  green: positiveInteger,
  blue: positiveInteger,
});

export const eventTypeDecoder: Decoder<EventType> = object({
  name: string,
  tags: array(string),
  color: optional(colorDecoder),
  timeframe: timeframeDecoder,
  exceptions: array(timeframeDecoder),
  occurences: array(occurenceDecoder),
});

export const rootDecoder: Decoder<Root> = object({
  timeframe: timeframeDecoder,
  eventTypes: array(eventTypeDecoder),
  exceptions: array(timeframeDecoder),
});
