import { describe, expect, test } from 'vitest';
import {
	colorDecoder,
	eventTypeDecoder,
	occurenceDecoder,
	rootDecoder,
	timeDecoder,
	timeframeDecoder
} from '../../src/lib/decoders';
import moment from 'moment';
import { Day } from '../../src/model';

describe('Decoders test', () => {
	describe('Timeframe decoder', () => {
		test('missing attributes should fail', () => {
			const element = {
				from: moment('2023-09-01').toDate()
			};

			expect(() => timeframeDecoder.verify(element)).toThrow();
		});

		test('wrong types should fail', () => {
			const element = {
				from: 'hello',
				to: 'world'
			};

			expect(() => timeframeDecoder.verify(element)).toThrow();
		});

		test('good types should give real object', () => {
			const element = {
				from: moment('2023-09-01').toDate(),
				to: moment('2023-09-03').toDate()
			};

			const timeframe = timeframeDecoder.verify(element);

			const from = moment(timeframe.from);
			expect(from.year()).toBe(2023);
			expect(from.month()).toBe(8);
			expect(from.date()).toBe(1);

			const to = moment(timeframe.to);
			expect(to.year()).toBe(2023);
			expect(to.month()).toBe(8);
			expect(to.date()).toBe(3);
		});
	});

	describe('Time decoder', () => {
		test('missing attributes should fail', () => {
			const element = {
				hour: 20
			};

			expect(() => timeDecoder.verify(element)).toThrow();
		});

		test('wrong types should fail', () => {
			const element = {
				hour: 'hello',
				minute: 'world'
			};

			expect(() => timeDecoder.verify(element)).toThrow();
		});

		test('good types should give real object', () => {
			const element = {
				hour: 20,
				minute: 30
			};
			const time = timeDecoder.verify(element);

			expect(time.hour).toBe(20);
			expect(time.minute).toBe(30);
		});
	});

	describe('Occurence decoder', () => {
		test('missing attributes should fail', () => {
			const element = {
				day: Day.Fr
			};

			expect(() => occurenceDecoder.verify(element)).toThrow();
		});

		test('wrong types should fail', () => {
			const element = {
				day: 'hello',
				from: 'world',
				to: '!'
			};

			expect(() => occurenceDecoder.verify(element)).toThrow();
		});

		test('good types should give real object', () => {
			const element = {
				day: Day.Fr,
				from: {
					hour: 20,
					minute: 30
				},
				to: {
					hour: 21,
					minute: 30
				}
			};

			const occurence = occurenceDecoder.verify(element);

			expect(occurence.day).toBe(Day.Fr);

			expect(occurence.from).toBeDefined();
			expect(occurence.to).toBeDefined();
		});
	});

	describe('Color decoder', () => {
		test('missing attributes should fail', () => {
			const element = {
				red: 255
			};

			expect(() => colorDecoder.verify(element)).toThrow();
		});

		test('wrong types should fail', () => {
			const element = {
				red: 'yes',
				green: 'no',
				blue: 'maybe'
			};

			expect(() => colorDecoder.verify(element)).toThrow();
		});

		test('good types should give real object', () => {
			const element = {
				red: 245,
				green: 245,
				blue: 245
			};

			const color = colorDecoder.verify(element);

			expect(color.red).toBe(element.red);
			expect(color.green).toBe(element.green);
			expect(color.blue).toBe(element.blue);
		});
	});

	describe('EventType decoder', () => {
		test('missing attributes should fail', () => {
			const element = {
				name: 12,
				tags: 'value',
				color: 'red',
				timeframe: 'timeframe',
				exception: 'timeframeDecoder'
			};

			expect(() => eventTypeDecoder.verify(element)).toThrow();
		});

		test('wrong types should fail', () => {
			const element = {
				name: 12,
				tags: 'value',
				color: 'red',
				timeframe: 'timeframe',
				exception: 'timeframeDecoder',
				occurences: 'occurenceDecoder'
			};

			expect(() => eventTypeDecoder.verify(element)).toThrow();
		});

		test('good types should give real object', () => {
			const element = {
				name: 'my-event',
				tags: ['hello', 'world'],
				color: {
					red: 123,
					green: 123,
					blue: 123
				},
				timeframe: {
					from: moment('2023-09-01').toDate(),
					to: moment('2023-09-03').toDate()
				},
				exceptions: [
					{
						from: moment('2023-09-01').toDate(),
						to: moment('2023-09-03').toDate()
					}
				],
				occurences: [
					{
						day: Day.Mo,
						from: {
							hour: 10,
							minute: 30
						},
						to: {
							hour: 11,
							minute: 30
						}
					}
				]
			};

			const eventType = eventTypeDecoder.verify(element);

			expect(eventType.name).toBe('my-event');

			expect(eventType.tags).toHaveLength(2);
			expect(eventType.tags).toContain('hello');
			expect(eventType.tags).toContain('world');

			expect(eventType.color).toBeDefined();
			expect(eventType.timeframe).toBeDefined();
			expect(eventType.exceptions).toHaveLength(1);
			expect(eventType.occurences).toHaveLength(1);
		});

		test('good types should give real object with minimal definition', () => {
			const element = {
				name: 'my-event',
				tags: [],
				timeframe: {
					from: moment('2023-09-01').toDate(),
					to: moment('2023-09-03').toDate()
				},
				exceptions: [],
				occurences: []
			};

			const eventType = eventTypeDecoder.verify(element);

			expect(eventType.name).toBe('my-event');

			expect(eventType.tags).toHaveLength(0);

			expect(eventType.color).toBeUndefined();
			expect(eventType.timeframe).toBeDefined();
			expect(eventType.exceptions).toHaveLength(0);
			expect(eventType.occurences).toHaveLength(0);
		});
	});

	describe('Root decoder', () => {
		test('missing attributes should fail', () => {
			const element = {
				exceptions: [],
				eventTypes: []
			};

			expect(() => rootDecoder.verify(element)).toThrow();
		});

		test('wrong types should fail', () => {
			const element = {
				timeframe: 'timeframe',
				exceptions: 'exceptions',
				eventTypes: 'eventTypes'
			};

			expect(() => rootDecoder.verify(element)).toThrow();
		});

		test('good types should give real object', () => {
			const element = {
				timeframe: {
					from: moment('2023-09-01').toDate(),
					to: moment('2023-09-03').toDate()
				},
				exceptions: [
					{
						from: moment('2023-09-01').toDate(),
						to: moment('2023-09-03').toDate()
					}
				],
				eventTypes: [
					{
						name: 'my-event',
						tags: [],
						timeframe: {
							from: moment('2023-09-01').toDate(),
							to: moment('2023-09-03').toDate()
						},
						exceptions: [],
						occurences: []
					}
				]
			};

			const root = rootDecoder.verify(element);

			expect(root.timeframe).toBeDefined();
			expect(root.exceptions).toHaveLength(1);
			expect(root.eventTypes).toHaveLength(1);
		});

		test('good types should give real object with minimal definition', () => {
			const element = {
				timeframe: {
					from: moment('2023-09-01').toDate(),
					to: moment('2023-09-03').toDate()
				},
				exceptions: [],
				eventTypes: []
			};

			const root = rootDecoder.verify(element);

			expect(root.timeframe).toBeDefined();
			expect(root.exceptions).toHaveLength(0);
			expect(root.eventTypes).toHaveLength(0);
		});
	});
});
