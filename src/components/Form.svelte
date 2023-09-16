<script lang="ts">
	import type { EventType } from '../model';

	const eventInfo: EventType = {
		name: '',
		exceptions: [],
		occurences: [],
		tags: [],
		timeframe: {
			from: new Date(),
			to: new Date()
		}
	};
</script>

<form>
	<label for="event-name">Event name:</label>
	<input id="event-name" type="text" bind:value={eventInfo.name} />

	<label for="event-color">Color:</label>
	<input id="event-color" type="color" bind:value={eventInfo.color} />

	<label for="event-from">From:</label>
	<input id="event-from" type="date" bind:value={eventInfo.timeframe.from} />

	<label for="event-to">To:</label>
	<input id="event-to" type="date" bind:value={eventInfo.timeframe.to} />

	{#each eventInfo.occurences as occurence}
		<label for="event-occurence-0-day">Day</label>
	{/each}
	input
</form>
