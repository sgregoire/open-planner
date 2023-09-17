import moment from 'moment';
import type { Timeframe, Time, Occurence, EventType } from '../root';
import type { EditableEvent, EditableOccurence, EditableTimeframe } from './EditableEvent';

export function dateToString(date: Date) {
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ].join('-');
}

export function timeToString(time: Time) {
  return [time.hour, time.minute].join(':');
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
  };
}

export function editableToEvent(event: EditableEvent): EventType {
  return {
    name: event.name,
    color: {
      red: 0,
      green: 0,
      blue: 0,
    },
    exceptions: event.exceptions.map(editableTimeframeToTimeframe),
    occurences: event.occurences.map(editableOccurenceToOccurence),
    tags: event.tags,
    timeframe: editableTimeframeToTimeframe(event.timeframe),
  };
}
