<script lang="ts">
  import type { EditableOccurence } from '../../model/form/EditableEvent';
  import { Day } from '../../model';
  import TagPlus from 'svelte-material-icons/TagPlus.svelte';
  import TagRemove from 'svelte-material-icons/TagRemove.svelte';
  import TagFrom from './TagFrom.svelte';

  export let occurence: EditableOccurence;
  export let id: string;

  function addTag() {
    occurence.tags = [...occurence.tags, ''];
    console.log(occurence.tags);
  }

  function deleteTag(index: number) {
    occurence.tags = occurence.tags.toSpliced(index, 1);
  }
</script>

<div class="form-control">
  <label for={`${id}-day`} class="label">
    <span class="label-text">Day</span>
  </label>
  <select name="Day" id={`${id}-day`} class="select select-bordered" bind:value={occurence.day}>
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
    <label for={`${id}-from`} class="label">
      <span class="label-text">From</span>
    </label>
    <input id={`${id}-from`} type="time" class="input input-bordered" bind:value={occurence.from} />
  </div>

  <div class="form-control">
    <label for={`${id}-to`} class="label">
      <span class="label-text">To</span>
    </label>
    <input id={`${id}-to`} type="time" class="input input-bordered" bind:value={occurence.to} />
  </div>

  <fieldset>
    <legend>Tags</legend>
    {#if occurence.tags.length > 0}
      <div class="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {#each occurence.tags as tag, i}
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
    {/if}
    <button class="btn btn-neutral btn-sm" on:click={addTag}>
      <TagPlus /> Add
    </button>
  </fieldset>
</div>
