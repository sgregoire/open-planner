import moment from 'moment';
import { describe, expect, test } from 'vitest';
import {
  betweenCheck,
  colorChecker,
  eventTypeChecker,
  nonEmptyString,
  occurenceChecker,
  reduceCheckResults,
  rootChecker,
  timeChecker,
  timeframeChecker,
} from '../../src/lib/checkers';
import {
  Day,
  type Color,
  type EventType,
  type Hour,
  type Minute,
  type Occurence,
  type Root,
  type Time,
  type Timeframe,
} from '../../src/model';

export const validTimeframe: Timeframe = {
  from: moment('2023-09-01').toDate(),
  to: moment('2023-09-03').toDate(),
};

export const invalidTimeframe: Timeframe = {
  from: moment('2023-09-05').toDate(),
  to: moment('2023-09-03').toDate(),
};

export const validTime: Time = {
  hour: 20,
  minute: 30,
};

describe('Checkers test', () => {
  describe('Utils checks', () => {
    describe('Between', () => {
      test('Bellow min', () => {
        expect(betweenCheck(50, 100, 200)).toBeFalsy();
      });

      test('Above max', () => {
        expect(betweenCheck(300, 100, 200)).toBeFalsy();
      });

      test('Right value', () => {
        expect(betweenCheck(150, 100, 200)).toBeTruthy();
      });
    });

    describe('Check values reducer', () => {
      test('Only false values should fail', () => {
        expect(reduceCheckResults([false, false])).toBeFalsy();
      });

      test('Only true values should be okay', () => {
        expect(reduceCheckResults([true, true])).toBeTruthy();
      });

      test('Mix true/false values should fail', () => {
        expect(reduceCheckResults([true, false])).toBeFalsy();
      });

      test('Empty should be okay', () => {
        expect(reduceCheckResults([])).toBeTruthy();
      });
    });

    describe('Non-empty', () => {
      test('empty should fail', () => {
        expect(nonEmptyString('')).toBeFalsy();
      });

      test('whitespace only should fail', () => {
        expect(nonEmptyString('  \t')).toBeFalsy();
      });

      test('filled should be okay', () => {
        expect(nonEmptyString('hello')).toBeTruthy();
      });
    });
  });

  describe('Timeframe checks', () => {
    test('Precedence check', () => {
      const timeframe = invalidTimeframe;

      expect(timeframeChecker(timeframe)).toBeFalsy();
    });
    test('OK check', () => {
      const timeframe = validTimeframe;

      expect(timeframeChecker(timeframe)).toBeTruthy();
    });
  });

  describe('Time check', () => {
    test('Invalid hour should fail', () => {
      const element: Time = {
        hour: 200 as Hour,
        minute: 30,
      };
      expect(timeChecker(element)).toBeFalsy();
    });

    test('Invalid minute should fail', () => {
      const element: Time = {
        hour: 20,
        minute: 300 as Minute,
      };
      expect(timeChecker(element)).toBeFalsy();
    });

    test('Correct time should be okay', () => {
      const element: Time = {
        hour: 20,
        minute: 30,
      };
      expect(timeChecker(element)).toBeTruthy();
    });
  });

  describe('Occurence check', () => {
    test('Invalid from time', () => {
      const occurence: Occurence = {
        day: Day.Fr,
        from: {
          hour: 200 as Hour,
          minute: 30,
        },
        to: validTime,
        tags: [],
      };

      expect(occurenceChecker(occurence)).toBeFalsy();
    });

    test('Invalid to time', () => {
      const occurence: Occurence = {
        day: Day.Fr,
        to: {
          hour: 200 as Hour,
          minute: 30,
        },
        from: validTime,
        tags: [],
      };

      expect(occurenceChecker(occurence)).toBeFalsy();
    });

    test('Overlapping to time', () => {
      const occurence: Occurence = {
        day: Day.Fr,
        from: {
          ...validTime,
          hour: (validTime.hour + 1) as Hour,
        },
        to: validTime,
        tags: [],
      };

      expect(occurenceChecker(occurence)).toBeFalsy();
    });

    test('No issue', () => {
      const occurence: Occurence = {
        day: Day.Fr,
        from: validTime,
        to: {
          ...validTime,
          hour: (validTime.hour + 1) as Hour,
        },
        tags: [],
      };

      expect(occurenceChecker(occurence)).toBeTruthy();
    });
  });

  describe('Color check', () => {
    test('value bellow min', () => {
      const color: Color = {
        red: 0,
        green: 0,
        blue: 0,
      };

      const bellowValue = -5;
      expect(
        colorChecker({
          ...color,
          red: bellowValue,
        }),
      ).toBeFalsy();
      expect(
        colorChecker({
          ...color,
          green: bellowValue,
        }),
      ).toBeFalsy();
      expect(
        colorChecker({
          ...color,
          blue: bellowValue,
        }),
      ).toBeFalsy();
    });

    test('value above max', () => {
      const color: Color = {
        red: 0,
        green: 0,
        blue: 0,
      };

      const aboveValue = 300;
      expect(
        colorChecker({
          ...color,
          red: aboveValue,
        }),
      ).toBeFalsy();
      expect(
        colorChecker({
          ...color,
          green: aboveValue,
        }),
      ).toBeFalsy();
      expect(
        colorChecker({
          ...color,
          blue: aboveValue,
        }),
      ).toBeFalsy();
    });
    test('value min', () => {
      const color: Color = {
        red: 0,
        green: 0,
        blue: 0,
      };

      const minValue = 0;
      expect(
        colorChecker({
          ...color,
          red: minValue,
        }),
      ).toBeTruthy();
      expect(
        colorChecker({
          ...color,
          green: minValue,
        }),
      ).toBeTruthy();
      expect(
        colorChecker({
          ...color,
          blue: minValue,
        }),
      ).toBeTruthy();
    });

    test('value max', () => {
      const color: Color = {
        red: 0,
        green: 0,
        blue: 0,
      };

      const maxValue = 255;
      expect(
        colorChecker({
          ...color,
          red: maxValue,
        }),
      ).toBeTruthy();
      expect(
        colorChecker({
          ...color,
          green: maxValue,
        }),
      ).toBeTruthy();
      expect(
        colorChecker({
          ...color,
          blue: maxValue,
        }),
      ).toBeTruthy();
    });
  });

  describe('EventType check', () => {
    test('Invalid name', () => {
      const eventType: EventType = {
        name: '  ',
        tags: [],
        timeframe: validTimeframe,
        exceptions: [],
        occurences: [],
      };
      expect(eventTypeChecker(eventType)).toBeFalsy();
    });

    test('Non-unique tags', () => {
      const eventType: EventType = {
        name: 'my-event',
        tags: ['my-tag', 'my-tag'],
        timeframe: validTimeframe,
        exceptions: [],
        occurences: [],
      };
      expect(eventTypeChecker(eventType)).toBeFalsy();
    });

    test('Emtpy tags value', () => {
      const eventType: EventType = {
        name: 'my-event',
        tags: ['  ', ' '],
        timeframe: validTimeframe,
        exceptions: [],
        occurences: [],
      };
      expect(eventTypeChecker(eventType)).toBeFalsy();
    });

    test('Invalid color', () => {
      const eventType: EventType = {
        name: 'my-event',
        color: {
          red: 300,
          green: 300,
          blue: 300,
        },
        tags: [],
        timeframe: validTimeframe,
        exceptions: [],
        occurences: [],
      };
      expect(eventTypeChecker(eventType)).toBeFalsy();
    });

    test('Invalid timeframe', () => {
      const eventType: EventType = {
        name: 'my-event',
        tags: [],
        timeframe: invalidTimeframe,
        exceptions: [],
        occurences: [],
      };
      expect(eventTypeChecker(eventType)).toBeFalsy();
    });

    test('Invalid timeframe', () => {
      const eventType: EventType = {
        name: 'my-event',
        tags: [],
        timeframe: validTimeframe,
        exceptions: [],
        occurences: [],
      };
      expect(eventTypeChecker(eventType)).toBeTruthy();
    });
  });

  describe('Root check', () => {
    test('Timeframe issue', () => {
      const root: Root = {
        timeframe: invalidTimeframe,
        exceptions: [],
        eventTypes: [],
      };

      expect(rootChecker(root)).toBeFalsy();
    });

    test('EventType issue', () => {
      const root: Root = {
        timeframe: validTimeframe,
        exceptions: [],
        eventTypes: [
          {
            name: 'my-event',
            tags: [],
            timeframe: invalidTimeframe,
            exceptions: [],
            occurences: [],
          },
        ],
      };

      expect(rootChecker(root)).toBeFalsy();
    });

    test('Exception issue', () => {
      const root: Root = {
        timeframe: validTimeframe,
        exceptions: [invalidTimeframe],
        eventTypes: [],
      };

      expect(rootChecker(root)).toBeFalsy();
    });

    test('No issue', () => {
      const root: Root = {
        timeframe: validTimeframe,
        exceptions: [],
        eventTypes: [],
      };

      expect(rootChecker(root)).toBeTruthy();
    });
  });
});
