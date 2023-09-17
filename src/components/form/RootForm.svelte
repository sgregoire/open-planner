<script lang="ts">
  import type { EditableRoot } from '../../model/form/EditableRoot';
  import { dateToString } from '../../model/form/mappers';
  import EventForm from './EventForm.svelte';
  import TimeframeFrom from './TimeframeFrom.svelte';
  import CalendarPlus from 'svelte-material-icons/CalendarPlus.svelte';
  import CalendarMinus from 'svelte-material-icons/CalendarMinus.svelte';
  import TimerCancel from 'svelte-material-icons/TimerCancel.svelte';

  export let root: EditableRoot;

  function addEvent() {
    const date = dateToString(new Date());
    root.eventTypes = [
      ...root.eventTypes,
      {
        name: '',
        color: '#ffffff',
        timeframe: {
          from: date,
          to: date,
        },
        exceptions: [],
        occurences: [],
        tags: [],
      },
    ];
  }

  function deleteEvent(index: number) {
    root.eventTypes = root.eventTypes.toSpliced(index, 1);
  }

  function addException() {
    const date = dateToString(new Date());
    root.exceptions = [
      ...root.exceptions,
      {
        from: date,
        to: date,
      },
    ];
  }

  function deleteException(index: number) {
    root.exceptions = root.exceptions.toSpliced(index, 1);
  }
</script>

<TimeframeFrom id="root-timeframe" bind:timeframe={root.timeframe} />
<fieldset>
  <legend>Exceptions</legend>
  <button class="btn btn-neutral btn-sm" on:click={addException}>
    <TimerCancel /> Add
  </button>
  {#each root.exceptions as exception, i}
    <div class="flex flex-col px-2">
      <div class="self-end">
        <button class="btn btn-danger btn-sm" on:click={() => deleteException(i)}>
          <CalendarMinus /> Remove
        </button>
      </div>
      <TimeframeFrom id={`root-exception-${i}`} bind:timeframe={exception} />
    </div>
  {/each}
</fieldset>

<fieldset>
  <legend>Events</legend>
  <button class="btn btn-neutral btn-sm" on:click={addEvent}>
    <CalendarPlus /> Add
  </button>
  {#each root.eventTypes as event, i}
    <div class="flex flex-col">
      <div class="self-end">
        <button class="btn btn-danger btn-sm" on:click={() => deleteEvent(i)}>
          <CalendarMinus />Remove
        </button>
      </div>
      <EventForm id={`root-event-${i}`} bind:event />
    </div>
  {/each}
</fieldset>
