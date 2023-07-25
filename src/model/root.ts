
export type Root {
  eventTypes: readonlyarray<EventType>;
}

export type EventType {
  name: string;
  color?: number;
  timeframe: Timeframe;
  exceptions: readonlyarray<Timeframe>;
}

export type Timeframe {
  from: date;
  to: date;
}
