import moment from 'moment'
import type { Day, EventType, Hour, Occurence, Root } from './root'

export const root: Root = {
    timeframe: {
        from: moment("2023-09-01").toDate(),
        to: moment("2024-06-01").toDate(),
    },
    eventTypes: [
        {
            name: "event-1",
            tags: new Set([
                "tag1",
                "tag2",
            ]),
            timeframe: {
                from: moment("2023-09-01").toDate(),
                to: moment("2024-06-01").toDate(),
            },
            exceptions: [
                {
                    from: moment("2023-11-01").toDate(),
                    to: moment("2023-12-01").toDate(),
                }
            ],
            occurences: [
                {
                    day: "Mo",
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
                    day: "Th",
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
                    day: "Fr",
                    from: {
                        hour: 11,
                        minute: 30, 
                    },
                    to: {
                        hour: 12,
                        minute: 30, 
                    },
                }
            ]
        },
        {
            name: "event-2",
            tags: new Set([
                "tag1",
                "tag2",
            ]),
            timeframe: {
                from: moment("2023-09-01").toDate(),
                to: moment("2024-06-01").toDate(),
            },
            exceptions: [
                {
                    from: moment("2024-01-01").toDate(),
                    to: moment("2024-02-01").toDate(),
                }
            ],
            occurences: [
                {
                    day: "Mo",
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
                    day: "Mo",
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
                    day: "Tu",
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
                    day: "We",
                    from: {
                        hour: 10,
                        minute: 30, 
                    },
                    to: {
                        hour: 12,
                        minute: 30, 
                    },
                }
            ]
        }
    ],
    exceptions: [
        {
            from: moment("2023-09-01").toDate(),
            to: moment("2023-10-01").toDate(),
        }
    ]
}

function indexToDay(idx: number): Day {
    switch (idx) {
        case 1: return "Mo";
        case 2: return "Tu";
        case 3: return "We";
        case 4: return "Th";
        case 5: return "Fr";
        case 6: return "Sa";
        default: return "Su";
    };
}

export function weekEventGenerator(number: number) {
    const eventTypes: EventType[] = [];
    for(let i = 0; i < number; i++) {
        const nbOccurences = Math.floor(Math.random() * 5);
        const occurences: Occurence[] = [];
        for(let j = 0; j < nbOccurences; j++) {
            const start = Math.floor(Math.random() * 12) + 8
            const duration = Math.floor(Math.random() * 2) + 1;
            occurences.push({
                day: indexToDay(Math.floor(Math.random() * 7)),
                from: {
                    hour: start as Hour,
                    minute: 0,
                },
                to: {
                    hour: start + duration as Hour,
                    minute: 0,
                }
            });
        }
        eventTypes.push({
            name: `event-${i}`,
            exceptions: [],
            tags: new Set(),
            timeframe: {
                from: moment("2023-09-01").toDate(),
                to: moment("2024-06-01").toDate(),
            },
            occurences,
        })

    }
    const root: Root = {
        timeframe: {
            from: moment("2023-09-01").toDate(),
            to: moment("2024-06-01").toDate(),
        },
        exceptions: [],
        eventTypes,
    }
    return root;
}