import moment from 'moment';
import { Day, type EventType, type Hour, type Occurence, type Root } from './root';

export const root: Root = {
  timeframe: {
    from: moment('2023-09-01').toDate(),
    to: moment('2024-06-01').toDate(),
  },
  eventTypes: [
    {
      name: 'event-1',
      tags: ['tag1', 'tag2'],
      timeframe: {
        from: moment('2023-09-01').toDate(),
        to: moment('2024-06-01').toDate(),
      },
      exceptions: [
        {
          from: moment('2023-11-01').toDate(),
          to: moment('2023-12-01').toDate(),
        },
      ],
      occurences: [
        {
          day: Day.Mo,
          from: {
            hour: 10,
            minute: 30,
          },
          to: {
            hour: 12,
            minute: 30,
          },
        },
        {
          day: Day.Th,
          from: {
            hour: 8,
            minute: 30,
          },
          to: {
            hour: 13,
            minute: 0,
          },
        },
        {
          day: Day.Fr,
          from: {
            hour: 11,
            minute: 30,
          },
          to: {
            hour: 12,
            minute: 30,
          },
        },
      ],
    },
    {
      name: 'event-2',
      tags: ['tag1', 'tag2'],
      timeframe: {
        from: moment('2023-09-01').toDate(),
        to: moment('2024-06-01').toDate(),
      },
      exceptions: [
        {
          from: moment('2024-01-01').toDate(),
          to: moment('2024-02-01').toDate(),
        },
      ],
      occurences: [
        {
          day: Day.Mo,
          from: {
            hour: 8,
            minute: 30,
          },
          to: {
            hour: 11,
            minute: 30,
          },
        },
        {
          day: Day.Mo,
          from: {
            hour: 11,
            minute: 30,
          },
          to: {
            hour: 12,
            minute: 30,
          },
        },
        {
          day: Day.Tu,
          from: {
            hour: 10,
            minute: 30,
          },
          to: {
            hour: 12,
            minute: 30,
          },
        },
        {
          day: Day.We,
          from: {
            hour: 10,
            minute: 30,
          },
          to: {
            hour: 12,
            minute: 30,
          },
        },
      ],
    },
  ],
  exceptions: [
    {
      from: moment('2023-09-01').toDate(),
      to: moment('2023-10-01').toDate(),
    },
  ],
};

export function weekEventGenerator(number: number) {
  const eventTypes: EventType[] = [];
  for (let i = 0; i < number; i++) {
    const nbOccurences = Math.floor(Math.random() * 5);
    const occurences: Occurence[] = [];
    for (let j = 0; j < nbOccurences; j++) {
      const start = Math.floor(Math.random() * 12) + 8;
      const duration = Math.floor(Math.random() * 2) + 1;
      occurences.push({
        day: indexToDay(Math.floor(Math.random() * 7)),
        from: {
          hour: start as Hour,
          minute: 0,
        },
        to: {
          hour: (start + duration) as Hour,
          minute: 0,
        },
      });
    }
    eventTypes.push({
      name: `event-${i}`,
      exceptions: [],
      tags: new Set(),
      timeframe: {
        from: moment('2023-09-01').toDate(),
        to: moment('2024-06-01').toDate(),
      },
      occurences,
    });
  }
  const root: Root = {
    timeframe: {
      from: moment('2023-09-01').toDate(),
      to: moment('2024-06-01').toDate(),
    },
    exceptions: [],
    eventTypes,
  };
  return root;
}
