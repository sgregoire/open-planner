<script lang="ts">
  import type { EditableOccurence, EditableTimeframe } from '../../model/form/EditableEvent';
  import { Day, type Time } from '../../model';

  export let occurence: EditableOccurence;
  export let index: number;
  export let deletionCallback: () => void;
</script>

<div class="flex flex-col">
  <div class="self-end">
    <input class="btn btn-error btn-sm" value="Remove" type="button" on:click={() => deletionCallback()} />
  </div>

  <div class="form-control">
    <label for={`event-occurence-${index}-day`} class="label">
      <span class="label-text">Day</span>
    </label>
    <select name="Day" id={`event-occurence-${index}-day`} class="select select-bordered" bind:value={occurence.day}>
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
      <label for={`event-occurence-${index}-from`} class="label">
        <span class="label-text">From</span>
      </label>
      <input
        id={`event-occurence-${index}-from`}
        type="time"
        class="input input-bordered"
        bind:value={occurence.from}
      />
    </div>

    <div class="form-control">
      <label for={`event-occurence-${index}-to`} class="label">
        <span class="label-text">To</span>
      </label>
      <input id={`event-occurence-${index}-to`} type="time" class="input input-bordered" bind:value={occurence.to} />
    </div>
  </div>
</div>
