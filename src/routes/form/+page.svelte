<script lang="ts">
  import { writable } from 'svelte/store';
  import { Day, type Time } from '../../model';
  import type { EditableEvent } from '../../model/form/EditableEvent';
  import { dateToString } from '../../model/form/mappers';

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
    {#each $event.occurences as occurence, i}
      <div class="flex">
        <input class="btn btn-error btn-sm" value="Remove" type="button" on:click={() => deleteOccurence(i)} />

        <div class="form-control">
          <label for={`event-occurence-${i}-day`} class="label">
            <span class="label-text">Day</span>
          </label>
          <select name="Day" id={`event-occurence-${i}-day`} class="select select-bordered" bind:value={occurence.day}>
            <option value={Day.Mo}>Monday</option>
            <option value={Day.Tu}>Tuesday</option>
            <option value={Day.We}>Wednesday</option>
            <option value={Day.Th}>Thursday</option>
            <option value={Day.Fr}>Friday</option>
            <option value={Day.Sa}>Saturday</option>
            <option value={Day.Su}>Sunday</option>
          </select>
        </div>

        <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div class="form-control">
            <label for={`event-occurence-${i}-from`} class="label">
              <span class="label-text">From</span>
            </label>
            <input
              id={`event-occurence-${i}-from`}
              type="time"
              class="input input-bordered"
              bind:value={occurence.from}
            />
          </div>

          <div class="form-control">
            <label for={`event-occurence-${i}-to`} class="label">
              <span class="label-text">To</span>
            </label>
            <input id={`event-occurence-${i}-to`} type="time" class="input input-bordered" bind:value={occurence.to} />
          </div>
        </div>
      </div>
    {/each}
  </fieldset>

  <fieldset>
    <legend>Exceptions</legend>
    <input class="btn btn-neutral btn-sm" value="Add" type="button" on:click={addException} />
    {#each $event.exceptions as exception, i}
      <div class="flex">
        <input class="btn btn-error btn-sm" value="Remove" type="button" on:click={() => deleteException(i)} />
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div class="form-control">
            <label for={`event-exception-${i}-from`}>
              <span class="label-text">From</span>
            </label>
            <input
              id={`event-exception-${i}-from`}
              type="date"
              class="input input-bordered"
              bind:value={exception.from}
            />
          </div>

          <div class="form-control">
            <label for={`event-occurence-${i}-to`}>
              <span class="label-text">To</span>
            </label>
            <input id={`event-occurence-${i}-to`} type="date" class="input input-bordered" bind:value={exception.to} />
          </div>
        </div>
      </div>
    {/each}
  </fieldset>

  <fieldset>
    <legend>Tags</legend>
    <input class="btn btn-neutral btn-sm" value="Add" type="button" on:click={addTag} />
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {#each $event.tags as tag, i}
        <div class="flex">
          <input class="btn btn-error btn-sm" value="Remove" type="button" on:click={() => deleteTag(i)} />

          <div class="form-control">
            <label for={`event-tags-${i}`}>
              <span class="label-text">Tag #{i + 1}</span>
            </label>
            <input id={`event-tags-${i}`} class="input input-bordered" bind:value={tag} />
          </div>
        </div>
      {/each}
    </div>
  </fieldset>

  <input type="submit" class="btn btn-success" />
</form>
