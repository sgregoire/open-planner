<script lang="ts">
  export let tag: string;
  export let id: string;
</script>

<div class="form-control">
  <label for={id}>
    <span class="label-text">Tag</span>
  </label>
  <input {id} class="input input-bordered" bind:value={tag} />
</div>
