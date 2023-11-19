import type { Day } from '../root';

export type EditableTimeframe = {
  from: string;
  to: string;
};

export type EditableOccurence = {
  day: Day;
  from: string;
  to: string;
  tags: string[];
};

export type EditableEvent = {
  name: string;
  color: string;
  timeframe: EditableTimeframe;
  exceptions: EditableTimeframe[];
  occurences: EditableOccurence[];
  tags: string[];
};
