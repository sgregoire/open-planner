<script lang="ts">
  export let tag: string;
  export let index: number;
  export let deletionCallback: () => void;
</script>

<div class="flex flex-col">
  <div class="self-end">
    <input class="btn btn-error btn-sm" value="Remove" type="button" on:click={() => deletionCallback()} />
  </div>

  <div class="form-control">
    <label for={`event-tags-${index}`}>
      <span class="label-text">Tag #{index + 1}</span>
    </label>
    <input id={`event-tags-${index}`} class="input input-bordered" bind:value={tag} />
  </div>
</div>
