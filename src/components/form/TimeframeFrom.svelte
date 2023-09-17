<script lang="ts">
  import type { EditableTimeframe } from '../../model/form/EditableEvent';

  export let timeframe: EditableTimeframe;
  export let id: string;
</script>

<div class="grid gap-4 grid-cols-1 md:grid-cols-2">
  <div class="form-control">
    <label for={`${id}-from`} class="label">
      <span class="label-text">From:</span>
    </label>
    <input id={`${id}-from`} type="date" class="input input-bordered" bind:value={timeframe.from} />
  </div>

  <div class="form-control">
    <label for={`${id}-to`} class="label">
      <span class="label-text">To:</span>
    </label>
    <input id={`${id}-to`} type="date" class="input input-bordered" bind:value={timeframe.to} />
  </div>
</div>
