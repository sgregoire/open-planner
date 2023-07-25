
export type Root = {
  eventTypes: ReadonlyArray<EventType>;
  exceptions: ReadonlyArray<Timeframe>;
}

export type EventType = {
  name: string;
  tags: ReadonlyArray<string>;
  color?: number;
  timeframe: Timeframe;
  exceptions: ReadonlyArray<Timeframe>
  occurences: ReadonlyArray<Occurence>
}

export type Timeframe = {
  from: date;
  to: date;
}

// TODO @sgregoire: change to bits
type Day = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export type Occurence = {
  day: Day;
  from: time;
  to: time;
}