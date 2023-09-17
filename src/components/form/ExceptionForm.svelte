<script lang="ts">
  import type { EditableTimeframe } from '../../model/form/EditableEvent';
  import TimeframeFrom from './TimeframeFrom.svelte';

  export let exception: EditableTimeframe;
  export let id: string;
  export let deletionCallback: () => void;
</script>

<div class="flex flex-col">
  <div class="self-end">
    <input class="btn btn-error btn-sm" value="Remove" type="button" on:click={() => deletionCallback()} />
  </div>
  <TimeframeFrom {id} bind:timeframe={exception} />
</div>
