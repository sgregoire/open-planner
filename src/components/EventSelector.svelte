<script lang="ts">
  import { colorToRgb } from '$lib/colorHelper';
  import type { EventType } from '../model';

  export let eventTypes: EventType[];
  export let selected: string[];
  export let selectedEventsCallback: (e: EventType[]) => void;

  function eventSelected(event: EventType, currentlyChecked: boolean) {
    if (currentlyChecked) {
      const newSelection = selected.filter((it) => it != event.name);
      selectedEventsCallback(eventTypes.filter((it) => newSelection.includes(it.name)));
    } else {
      selectedEventsCallback(eventTypes.filter((it) => selected.includes(it.name) || it.name == event.name));
    }
  }
</script>

<form action="">
  <div class="grid gap-4 grid-cols-6">
    {#each eventTypes as event, i}
      <div>
        <label for={`event-selector-${i}`}>
          {event.name}
          <span class="h-4 w-4 inline-block" style="background-color: {colorToRgb(event.color)};" />
        </label>
        <input
          id={`event-selector-${i}`}
          type="checkbox"
          on:change={(e) => eventSelected(event, selected.includes(event.name))}
          checked={selected.includes(event.name)}
        />
      </div>
    {/each}
  </div>
</form>
