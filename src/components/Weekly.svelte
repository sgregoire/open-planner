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
            case 'Mo': return 1;
            case 'Tu': return 2;
            case 'We': return 3;
            case 'Th': return 4;
            case 'Fr': return 5;
            case 'Sa': return 6;
            case 'Su': return 7;
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
        console.log(container.childNodes);
        container.childNodes.forEach(it => it.remove());
        const hourHeight = container.clientHeight / (hoursToDisplay + 1) ;
        const minuteHeight = hourHeight / 60;
        const dayWidth = container.clientWidth / 8;

        days.forEach((day, index) => {
            const child = document.createElement('div');
            child.textContent = day;
            child.classList.add("absolute", "bg-blue-600", "text-center", "border")
            child.style.setProperty("width", `${dayWidth}px`);
            child.style.setProperty("height", `${hourHeight}px`);
            child.style.setProperty("top", "0")
            child.style.setProperty("left", `${(index + 1) * dayWidth}px`)

            container.appendChild(child);
        });

        for(let i = 1; i <= hoursToDisplay; i++) {
            const child = document.createElement('div');
            child.textContent = `${fromHour + i - 1}h`;
            child.classList.add("absolute", "bg-green-600", "text-left", "pr-2", "border")
            child.style.setProperty("width", `${dayWidth}px`);
            child.style.setProperty("height", `${hourHeight}px`);
            child.style.setProperty("top", `${i * hourHeight}px`);
            child.style.setProperty("left", "0")
            
            const quarterHeight = hourHeight / 4;
            [0, 1, 2, 3].forEach(it => {
                const start = document.createElement('div');
                start.textContent = `${it * 15}`;
                start.classList.add("absolute", "bg-green-600", "text-right", "pr-2", "border")
                //start.style.setProperty("width", `${dayWidth}px`);
                start.style.setProperty("top", `${quarterHeight * it}px`)
                start.style.setProperty("right", "0")
                child.appendChild(start)
            })

            container.appendChild(child);
        }

        root.eventTypes.forEach((eventType) => {
            eventType.occurences.forEach((occurence) => {
                const overlappingOccurences = root.eventTypes
                    .flatMap(it => it.occurences)
                    .filter(it => isOverlapping(occurence, it))
    
                const child = document.createElement('div');
                child.textContent = `${eventType.name} - ${occurence.from.hour}:${occurence.from.minute} - ${occurence.to.hour}:${occurence.to.minute}`;
                child.classList.add("absolute", "text-center", "pr-2", "border")

                const occurenceWidth = dayWidth / overlappingOccurences.length;
                child.style.setProperty("width", `${occurenceWidth}px`);
                
                const duration = computeDuration(occurence.from, occurence.to)
                child.style.setProperty("height", `${minuteHeight * duration}px`);
                const durationFromBeginning = computeDuration({ hour: fromHour, minute: 0 }, occurence.from);
                child.style.setProperty("top", `${hourHeight + durationFromBeginning * minuteHeight}px`)

                // TODO @sgregoire: When an event overlaps with 2 other that does not, the size is incorrect
                const offset = occurenceWidth * overlappingOccurences.findIndex(it => it === occurence);
                child.style.setProperty("left", `${dayOffset(occurence.day) * dayWidth + offset}px`)
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