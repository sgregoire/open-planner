import type { EditableEvent, EditableTimeframe } from './EditableEvent';

export type EditableRoot = {
  timeframe: EditableTimeframe;
  eventTypes: EditableEvent[];
  exceptions: EditableTimeframe[];
};
