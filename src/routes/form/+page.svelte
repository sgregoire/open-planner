<script lang="ts">
  import { writable } from 'svelte/store';
  import { Day, type Time } from '../../model';
  import type { EditableEvent } from '../../model/form/EditableEvent';
  import { dateToString } from '../../model/form/mappers';
  import ExceptionForm from '../../components/form/ExceptionForm.svelte';
  import OccurenceForm from '../../components/form/OccurenceForm.svelte';
  import TagFrom from '../../components/form/TagFrom.svelte';

  const event = writable({
    name: '',
    color: '#FFFFFF',
    timeframe: {
      from: dateToString(new Date()),
      to: dateToString(new Date()),
    },
    exceptions: [],
    occurences: [],
    tags: [] as string[],
  } as EditableEvent);

  function addTag() {
    $event.tags = [...$event.tags, ''];
  }

  function deleteTag(index: number) {
    $event.tags = $event.tags.toSpliced(index, 1);
  }

  function addException() {
    $event.exceptions = [
      ...$event.exceptions,
      {
        from: dateToString(new Date()),
        to: dateToString(new Date()),
      },
    ];
  }

  function deleteException(index: number) {
    $event.exceptions = $event.exceptions.toSpliced(index, 1);
  }

  function addOccurence() {
    $event.occurences = [
      ...$event.occurences,
      {
        day: Day.Mo,
        from: '10:30',
        to: '11:30',
      },
    ];
  }

  function deleteOccurence(index: number) {
    $event.occurences = $event.occurences.toSpliced(index, 1);
  }

  function submit(e: SubmitEvent) {
    e.preventDefault();
  }
</script>

<form on:submit|preventDefault={submit}>
  <div class="form-control">
    <label for="event-name" class="label">
      <span class="label-text">Event name:</span>
    </label>
    <input id="event-name" type="text" class="input input-bordered" bind:value={$event.name} />
  </div>

  <div class="form-control">
    <label for="event-color" class="label">
      <span class="label-text">Color:</span>
    </label>
    <input id="event-color" type="color" class="input input-bordered w-16" bind:value={$event.color} />
  </div>

  <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
    <div class="form-control">
      <label for="event-from" class="label">
        <span class="label-text">From:</span>
      </label>
      <input id="event-from" type="date" class="input input-bordered" bind:value={$event.timeframe.from} />
    </div>

    <div class="form-control">
      <label for="event-to" class="label">
        <span class="label-text">To:</span>
      </label>
      <input id="event-to" type="date" class="input input-bordered" bind:value={$event.timeframe.to} />
    </div>
  </div>

  <fieldset>
    <legend>Occurences</legend>
    <input class="btn btn-neutral btn-sm" value="Add" type="button" on:click={addOccurence} />
    {#each $event.occurences as occurence, index}
      <OccurenceForm bind:occurence {index} deletionCallback={() => deleteOccurence(index)} />
    {/each}
  </fieldset>

  <fieldset>
    <legend>Exceptions</legend>
    <input class="btn btn-neutral btn-sm" value="Add" type="button" on:click={addException} />
    {#each $event.exceptions as exception, index}
      <ExceptionForm bind:exception {index} deletionCallback={() => deleteException(index)} />
    {/each}
  </fieldset>

  <fieldset>
    <legend>Tags</legend>
    <input class="btn btn-neutral btn-sm" value="Add" type="button" on:click={addTag} />
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {#each $event.tags as tag, index}
        <TagFrom bind:tag {index} deletionCallback={() => deleteTag(index)} />
      {/each}
    </div>
  </fieldset>

  <input type="submit" class="btn btn-success" />
</form>
