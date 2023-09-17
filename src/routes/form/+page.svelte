<script lang="ts">
  import { Day, type EventType } from '../../model';

  const eventInfo: EventType = {
    name: '',
    exceptions: [],
    occurences: [],
    tags: [],
    timeframe: {
      from: new Date(),
      to: new Date(),
    },
  };

  function addTag() {
    eventInfo.tags.push('');
  }

  function deleteTag(index: number) {
    eventInfo.tags.splice(index, 1);
  }

  function addException() {
    eventInfo.exceptions.push({
      from: new Date(),
      to: new Date(),
    });
  }

  function deleteException(index: number) {
    eventInfo.exceptions.splice(index, 1);
  }

  function addOccurence() {
    eventInfo.occurences.push({
      day: Day.Mo,
      from: {
        hour: 10,
        minute: 30,
      },
      to: {
        hour: 11,
        minute: 30,
      },
    });
  }

  function deleteOccurence(index: number) {
    eventInfo.occurences.splice(index, 1);
  }
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

  <fieldset>
    <legend>Occurences</legend>
    <input type="button" value="Add" on:click={addOccurence} />
    {#each eventInfo.occurences as occurence, i}
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
    {#each eventInfo.exceptions as exception, i}
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
    {#each eventInfo.tags as tag, i}
      <input type="button" value="Remove" on:click={() => deleteTag(i)} />

      <label for={`event-tags-${i}`}>Tag {i + 1}</label>
      <input id={`event-tags-${i}`} type="date" bind:value={tag} />
    {/each}
  </fieldset>
</form>
