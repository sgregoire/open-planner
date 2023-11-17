<script lang="ts">
  import { Day } from '../../model';
  import type { EditableEvent } from '../../model/form/EditableEvent';
  import { dateToString } from '../../model/form/mappers';
  import TagFrom from './TagFrom.svelte';
  import OccurenceForm from './OccurenceForm.svelte';
  import TimeframeFrom from './TimeframeFrom.svelte';
  import TagPlus from 'svelte-material-icons/TagPlus.svelte';
  import TagRemove from 'svelte-material-icons/TagRemove.svelte';
  import ClockPlus from 'svelte-material-icons/ClockPlus.svelte';
  import ClockMinus from 'svelte-material-icons/ClockMinus.svelte';
  import TimerCancel from 'svelte-material-icons/TimerCancel.svelte';

  export let event: EditableEvent;
  export let id: string;
  function addTag() {
    event.tags = [...event.tags, ''];
  }

  function deleteTag(index: number) {
    event.tags = event.tags.toSpliced(index, 1);
  }

  function addException() {
    event.exceptions = [
      ...event.exceptions,
      {
        from: dateToString(new Date()),
        to: dateToString(new Date()),
      },
    ];
  }

  function deleteException(index: number) {
    event.exceptions = event.exceptions.toSpliced(index, 1);
  }

  function addOccurence() {
    event.occurences = [
      ...event.occurences,
      {
        day: Day.Mo,
        from: '10:30',
        to: '11:30',
      },
    ];
  }

  function deleteOccurence(index: number) {
    event.occurences = event.occurences.toSpliced(index, 1);
  }
</script>

<div class="form-control">
  <label for={`${id}-name`} class="label">
    <span class="label-text">Event name:</span>
  </label>
  <input id={`${id}-name`} type="text" class="input input-bordered" bind:value={event.name} />
</div>

<div class="form-control">
  <label for={`${id}-color`} class="label">
    <span class="label-text">Color:</span>
  </label>
  <input id={`${id}-color`} type="color" class="input input-bordered w-16" bind:value={event.color} />
</div>

<TimeframeFrom {id} bind:timeframe={event.timeframe} />

<fieldset>
  <legend>Occurences</legend>
  <button class="btn btn-neutral btn-sm" on:click={addOccurence}>
    <ClockPlus /> Add
  </button>
  {#each event.occurences as occurence, i}
    <div class="flex flex-col px-2">
      <div class="self-end">
        <button class="btn btn-danger btn-sm" on:click={() => deleteOccurence(i)}>
          <ClockMinus /> Remove
        </button>
      </div>
      <OccurenceForm id={`${id}-occurence-${i}`} bind:occurence />
    </div>
  {/each}
</fieldset>

<fieldset>
  <legend>Exceptions</legend>
  <button class="btn btn-neutral btn-sm" on:click={addException}>
    <TimerCancel /> Add
  </button>
  {#each event.exceptions as exception, i}
    <div class="flex flex-col px-2">
      <div class="self-end">
        <button class="btn btn-danger btn-sm" on:click={() => deleteException(i)}>
          <ClockMinus /> Remove
        </button>
      </div>
      <TimeframeFrom id={`${id}-exception-${i}`} bind:timeframe={exception} />
    </div>
  {/each}
</fieldset>

<fieldset>
  <legend>Tags</legend>
  <button class="btn btn-neutral btn-sm" on:click={addTag}>
    <TagPlus /> Add
  </button>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
    {#each event.tags as tag, i}
      <div class="flex flex-col px-2">
        <div class="self-end">
          <button class="btn btn-danger btn-sm" on:click={() => deleteTag(i)}>
            <TagRemove /> Remove
          </button>
        </div>
        <TagFrom id={`${id}-tags-${i}`} bind:tag />
      </div>
    {/each}
  </div>
</fieldset>
