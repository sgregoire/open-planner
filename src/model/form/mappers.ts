import moment from 'moment';
import type { Timeframe, Time, Occurence, EventType, Root, Color } from '../root';
import type { EditableEvent, EditableOccurence, EditableTimeframe } from './EditableEvent';
import type { EditableRoot } from './EditableRoot';

export function dateToString(date: Date) {
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ].join('-');
}

export function timeToString(time: Time) {
  return [time.hour.toString().padStart(2, '0'), time.minute.toString().padStart(2, '0')].join(':');
}

function stringToDate(value: string): Date {
  return moment(value).toDate();
}

function editableTimeframeToTimeframe(tf: EditableTimeframe): Timeframe {
  return {
    from: stringToDate(tf.from),
    to: stringToDate(tf.to),
  };
}

function stringToTime(value: string): Time {
  const parts = value.split(':');
  return {
    hour: parseInt(parts[0]),
    minute: parseInt(parts[1]),
  };
}

function editableOccurenceToOccurence(occurence: EditableOccurence): Occurence {
  return {
    day: occurence.day,
    from: stringToTime(occurence.from),
    to: stringToTime(occurence.to),
    tags: occurence.tags,
  };
}

function hexToDecimal(value: string) {
  return parseInt(value, 16);
}

export function editableToEvent(event: EditableEvent): EventType {
  return {
    name: event.name,
    color: {
      red: hexToDecimal(event.color.slice(1, 3)),
      green: hexToDecimal(event.color.slice(3, 5)),
      blue: hexToDecimal(event.color.slice(5, 7)),
    },
    exceptions: event.exceptions.map(editableTimeframeToTimeframe),
    occurences: event.occurences.map(editableOccurenceToOccurence),
    tags: event.tags,
    timeframe: editableTimeframeToTimeframe(event.timeframe),
  };
}

export function editableRootToRoot(root: EditableRoot): Root {
  return {
    timeframe: editableTimeframeToTimeframe(root.timeframe),
    exceptions: root.exceptions.map(editableTimeframeToTimeframe),
    eventTypes: root.eventTypes.map(editableToEvent),
  };
}

export function timeframeToEditable(timeframe: Timeframe): EditableTimeframe {
  return {
    from: dateToString(timeframe.from),
    to: dateToString(timeframe.to),
  };
}

export function occurenceToEditable(occurence: Occurence): EditableOccurence {
  return {
    day: occurence.day,
    from: timeToString(occurence.from),
    to: timeToString(occurence.to),
    tags: occurence.tags,
  };
}

function decimalToHex(color: Color | undefined) {
  if (color) {
    return `#${color.red.toString(16)}${color.green.toString(16)}${color.blue.toString(16)}`;
  }
  return '#FFFFFF';
}
export function eventToEditable(event: EventType): EditableEvent {
  return {
    name: event.name,

    color: decimalToHex(event.color),
    timeframe: timeframeToEditable(event.timeframe),
    exceptions: event.exceptions.map(timeframeToEditable),
    occurences: event.occurences.map(occurenceToEditable),
    tags: event.tags,
  };
}

export function rootToEdiable(root: Root): EditableRoot {
  return {
    timeframe: timeframeToEditable(root.timeframe),
    eventTypes: root.eventTypes.map(eventToEditable),
    exceptions: root.exceptions.map(timeframeToEditable),
  };
}
