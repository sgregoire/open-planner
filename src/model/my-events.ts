import moment from 'moment'
import type { Root } from './root'

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
