<script lang="ts">
	import type { Day, Hour, Occurence, Time } from "../model";
    import { root } from "../model/my-events";
	import { generateColors } from "../color-generator";
	import { onMount } from "svelte";
	import moment from "moment";

    const colors = generateColors(root.eventTypes.filter(it => it.color === undefined).length);
    let cnt = 0;
    for(const event of root.eventTypes) {
        if (event.color === undefined) {
            event.color = colors[cnt]
            cnt++;
        }
    }

    let container: HTMLDivElement;

    const days = [
        "Lu",
        "Ma",
        "Me",
        "Je",
        "Ve",
        "Sa",
        "Di",
    ];

    
    const occurences = root.eventTypes.flatMap(eventType => eventType.occurences);
    const froms: number[] = occurences.map(it => it.from.hour);
    const tos: number[] = occurences.map(it => it.to.minute > 0 ? it.to.hour + 1 : it.to.hour);
    const fromHour = Math.min(...froms) as Hour;
    const toHour = Math.max(...tos) as Hour;

    const hoursToDisplay = toHour - fromHour

    function dayOffset(day: Day) {
        switch(day) {
            case 'Mo': return 0;
            case 'Tu': return 1;
            case 'We': return 2;
            case 'Th': return 3;
            case 'Fr': return 4;
            case 'Sa': return 5;
            case 'Su': return 6;
        }
    }

    function computeDuration(from: Time, to: Time) {
        return (to.hour - from.hour) * 60 - from.minute + to.minute;
    }

    function dayToMomentIndex(d: Day) {
        switch (d) {
            case "Mo": return 1;
            case "Tu": return 2;
            case "We": return 3;
            case "Th": return 4;
            case "Fr": return 5;
            case "Sa": return 6;
            case "Su": return 0;
        };
    }
    function isOverlapping(a: Occurence, b: Occurence) {
        const aDate = moment().day(dayToMomentIndex(a.day));
        const aFrom = new Date(aDate.toDate().setHours(a.from.hour, a.from.minute, 0, 0));
        const aTo = new Date(aDate.toDate().setHours(a.to.hour, a.to.minute, 0, 0));
        
        const bDate = moment().day(dayToMomentIndex(b.day));
        const bFrom = new Date(bDate.toDate().setHours(b.from.hour, b.from.minute, 0, 0));
        const bTo = new Date(bDate.toDate().setHours(b.to.hour, b.to.minute, 0, 0));

        // If an event ends before the other starts
        if(aTo <= bFrom || bTo <= aFrom) {
            return false;
        }

        return true;
    }

    function paint() {
        container.childNodes.forEach(it => it.remove());
        
        const dayLabels = [];
        const dayLines = [];
        days.forEach((day) => {
            const dayLabel = document.createElement('div');
            dayLabel.textContent = day;
            dayLabel.classList.add("absolute", "bg-blue-600", "text-center", "invisible", "py-2")
            
            dayLabel.style.setProperty("top", "0")

            
            const dayLine = document.createElement('div');
            dayLine.classList.add("absolute", "w-px", "bg-slate-500", "bla")
            dayLine.style.setProperty("top", "0")
            dayLine.style.setProperty("bottom", "0")
            
            container.appendChild(dayLabel);
            container.appendChild(dayLine);
            
            dayLines.push(dayLine);
            dayLabels.push(dayLabel)

        });

        const hourLabels = [];
        const hourLines = [];
        for(let i = 0; i < hoursToDisplay; i++) {
            const hourLabel = document.createElement('div');
            hourLabel.textContent = `${(fromHour + i).toString().padStart(2, "0")}:00`;
            hourLabel.classList.add("absolute", "text-left", "pr-2", "flex", "content-center", "px-2", "invisible")
            hourLabel.style.setProperty("left", "0")
            container.appendChild(hourLabel);
            
            const hourLine = document.createElement('div');
            hourLine.classList.add("absolute", "bg-green-600", "text-right", "h-px","bg-slate-500", "invisible")
            hourLine.style.setProperty("right", "0")
            hourLine.style.setProperty("left", "0")
            container.appendChild(hourLine)

            hourLabels.push(hourLabel)
            hourLines.push(hourLine)
        }

        const hourWidth = Math.max(...hourLabels.map(elt => elt.clientWidth))

        const dayWidth = (container.clientWidth - hourWidth) / 7;
        const dayHeight = Math.max(...dayLabels.map(elt => elt.clientHeight))
        const hourHeight = (container.clientHeight - dayHeight) / hoursToDisplay;
        const minuteHeight = hourHeight / 60;
        
        hourLines.forEach((elt, idx) => {
            elt.style.setProperty("top", `${dayHeight + hourHeight * idx}px`)
            elt.style.setProperty("left", `${hourWidth}px`);
            elt.classList.remove("invisible");
        })

        hourLabels.forEach((elt, idx) => {
            // To center
            const height = elt.clientHeight
            elt.style.setProperty("top", `${dayHeight + idx * hourHeight - height / 2}px`)
            elt.classList.remove("invisible")
        });


        dayLabels.forEach((elt, idx) => {
            elt.style.setProperty("width", `${dayWidth}px`);
            elt.style.setProperty("left", `${hourWidth + idx * dayWidth}px`)
            elt.style.setProperty("height", `${dayHeight}px`);
            elt.classList.remove("invisible");
        })

        dayLines.forEach((elt, idx) => {
            elt.style.setProperty("left", `${hourWidth + idx * dayWidth}px`)
        })

        root.eventTypes.forEach((eventType) => {
            eventType.occurences.forEach((occurence) => {
                const overlappingOccurences = root.eventTypes
                    .flatMap(it => it.occurences)
                    .filter(it => isOverlapping(occurence, it))

                const others = overlappingOccurences.filter(it => it !== occurence)

                const otherEventsInParallelCnt = Math.max(
                    // 0 for default value
                    ...[0, ...others.map((other, idx) =>
                        // Count events in parallel
                        others.slice(idx + 1)
                            .reduce((acc, it) => acc + (isOverlapping(other, it) ? 2 : 0), 0)
                    )]
                );

                const child = document.createElement('div');
                child.textContent = `${eventType.name} - ${occurence.from.hour}:${occurence.from.minute} - ${occurence.to.hour}:${occurence.to.minute}`;
                child.classList.add("absolute", "text-center", "px-1", "bg-clip-content")

                // 1 for current event
                const occurenceWidth = dayWidth / (otherEventsInParallelCnt + 1);
                child.style.setProperty("width", `${occurenceWidth}px`);
                
                const duration = computeDuration(occurence.from, occurence.to)
                child.style.setProperty("height", `${minuteHeight * duration}px`);
                const durationFromBeginning = computeDuration({ hour: fromHour, minute: 0 }, occurence.from);
                child.style.setProperty("top", `${dayHeight + durationFromBeginning * minuteHeight}px`)

                const offset = occurenceWidth * overlappingOccurences.findIndex(it => it === occurence);
                child.style.setProperty("left", `${hourWidth + dayOffset(occurence.day) * dayWidth + offset}px`)
                child.style.setProperty("background-color", `#${eventType.color?.toString(16)}`)

                container.appendChild(child);
            })
        })
    }

	onMount(() => {
        paint();
        window.addEventListener('resize', paint);
		
		return () => {
			window.removeEventListener('resize', paint);
		}
	});

</script>

<div class="w-screen h-screen relative">
    <div bind:this={container} class="absolute top-0 bottom-0 left-0 right-0 bg-slate-400" />
</div>