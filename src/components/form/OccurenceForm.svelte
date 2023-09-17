<script lang="ts">
  import type { EditableOccurence } from '../../model/form/EditableEvent';
  import { Day } from '../../model';

  export let occurence: EditableOccurence;
  export let id: string;
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
</div>
