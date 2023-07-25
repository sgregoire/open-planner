
export type Root = {
  eventTypes: ReadonlyArray<EventType>;
}

export type EventType = {
  name: string;
  color?: number;
  timeframe: Timeframe;
  exceptions: ReadonlyArray<Timeframe>;
}

export type Timeframe = {
  from: date;
  to: date;
}
