<script lang="ts">
  import type { EditableTimeframe } from '../../model/form/EditableEvent';

  export let exception: EditableTimeframe;
  export let index: number;
  export let deletionCallback: () => void;
</script>

<div class="flex flex-col">
  <div class="self-end">
    <input class="btn btn-error btn-sm" value="Remove" type="button" on:click={() => deletionCallback()} />
  </div>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
    <div class="form-control">
      <label for={`event-exception-${index}-from`}>
        <span class="label-text">From</span>
      </label>
      <input
        id={`event-exception-${index}-from`}
        type="date"
        class="input input-bordered"
        bind:value={exception.from}
      />
    </div>

    <div class="form-control">
      <label for={`event-occurence-${index}-to`}>
        <span class="label-text">To</span>
      </label>
      <input id={`event-occurence-${index}-to`} type="date" class="input input-bordered" bind:value={exception.to} />
    </div>
  </div>
</div>
