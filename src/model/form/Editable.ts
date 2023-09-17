import moment from 'moment';
import type { Day, EventType, Occurence, Time, Timeframe } from '../root';

type EditableTimeframe = {
  from: string;
  to: string;
};

type EditableOccurence = {
  day: Day;
  from: string;
  to: string;
};

export type EditableEvent = {
  name: string;
  color: string;
  timeframe: EditableTimeframe;
  exceptions: EditableTimeframe[];
  occurences: EditableOccurence[];
  tags: string[];
};
