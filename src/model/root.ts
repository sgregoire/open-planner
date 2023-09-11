
export type Root = {
  timeframe: Timeframe,
  eventTypes: ReadonlyArray<EventType>;
  exceptions: ReadonlyArray<Timeframe>;
}

export type EventType = {
  name: string;
  tags: ReadonlySet<string>;
  color?: number;
  timeframe: Timeframe;
  exceptions: ReadonlyArray<Timeframe>;
  occurences: ReadonlyArray<Occurence>;
}

export type Timeframe = {
  from: Date;
  to: Date;
}

// TODO @sgregoire: change to bits
export type Day = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";
export type Hour =  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
  | 20 | 21 | 22 | 23;
export type Minute = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
  | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
  | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
  | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49
  | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59;
export type Time = {
  hour: Hour;
  minute: Minute;
}

export type Occurence = {
  day: Day;
  from: Time;
  to: Time;
}