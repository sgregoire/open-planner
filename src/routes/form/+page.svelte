<script lang="ts">
    import { writable } from 'svelte/store';
  import { Day, type EventType, type Occurence } from '../../model';

  type EditableTimeframe = {
    from: string,
    to: string
  }

  function dateToString(date: Date) {
    return [
      date.getFullYear(), 
      (date.getMonth() + 1).toString().padStart(2, '0'), 
      date.getDate().toString().padStart(2, '0')
    ].join('-');
  }

  const event = writable({
    name: '',
    color: '#FFFFFF',
    timeframe: {
      from: dateToString(new Date()),
      to: dateToString(new Date()),
    } as EditableTimeframe,
    exceptions: [] as EditableTimeframe[],
    occurences: [] as Occurence[],
    tags: [] as string[],
  })

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
      }
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
        from: {
          hour: 10,
          minute: 30,
        },
        to: {
          hour: 11,
          minute: 30,
        },
      }
    ];
  }

  function deleteOccurence(index: number) {
    $event.occurences = $event.occurences.toSpliced(index, 1);
  }
</script>

<form>
  <label for="event-name">Event name:</label>
  <input id="event-name" type="text" bind:value={$event.name} />
<!-- 
  <label for="event-color">Color:</label>
  <input id="event-color" type="color" bind:value={event.color} /> -->

  <label for="event-from">From:</label>
  <input id="event-from" type="date" bind:value={$event.timeframe.from} />

  <label for="event-to">To:</label>
  <input id="event-to" type="date" bind:value={$event.timeframe.to} />

  <fieldset>
    <legend>Occurences</legend>
    <input type="button" value="Add" on:click={addOccurence} />
    {#each $event.occurences as occurence, i}
      <input type="button" value="Remove" on:click={() => deleteOccurence(i)} />

      <label for={`event-occurence-${i}-day`}>Day</label>
      <input id={`event-occurence-${i}-day`} bind:value={occurence.day} />

      <label for={`event-occurence-${i}-from`}>From</label>
      <input id={`event-occurence-${i}-from`} type="time" bind:value={occurence.from} />

      <label for={`event-occurence-${i}-to`}>To</label>
      <input id={`event-occurence-${i}-to`} type="time" bind:value={occurence.to} />
    {/each}
  </fieldset>

  <fieldset>
    <legend>Exceptions</legend>
    <input type="button" value="Add" on:click={addException} />
    {#each $event.exceptions as exception, i}
      <input type="button" value="Remove" on:click={() => deleteException(i)} />

      <label for={`event-exception-${i}-from`}>From</label>
      <input id={`event-exception-${i}-from`} type="date" bind:value={exception.from} />

      <label for={`event-occurence-${i}-to`}>From</label>
      <input id={`event-occurence-${i}-to`} type="date" bind:value={exception.to} />
    {/each}
  </fieldset>

  <fieldset>
    <legend>Tags</legend>
    <input type="button" value="Add" on:click={addTag} />
    {#each $event.tags as tag, i}
      <input type="button" value="Remove" on:click={() => deleteTag(i)} />

      <label for={`event-tags-${i}`}>Tag {i + 1}</label>
      <input id={`event-tags-${i}`} bind:value={tag} />
    {/each}
  </fieldset>
</form>
