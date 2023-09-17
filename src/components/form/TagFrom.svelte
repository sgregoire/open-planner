<script lang="ts">
  export let tag: string;
  export let id: string;
  export let deletionCallback: () => void;
</script>

<div class="flex flex-col">
  <div class="self-end">
    <input class="btn btn-error btn-sm" value="Remove" type="button" on:click={() => deletionCallback()} />
  </div>

  <div class="form-control">
    <label for={id}>
      <span class="label-text">Tag</span>
    </label>
    <input {id} class="input input-bordered" bind:value={tag} />
  </div>
</div>
