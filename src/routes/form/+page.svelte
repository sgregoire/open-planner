<script lang="ts">
  import { writable } from 'svelte/store';
  import { dateToString, editableRootToRoot } from '../../model/form/mappers';
  import RootForm from '../../components/form/RootForm.svelte';
  import type { EditableRoot } from '../../model/form/EditableRoot';
  import { setContext } from 'svelte';
  import ContentSave from 'svelte-material-icons/ContentSave.svelte';

  const root = writable<EditableRoot>({
    timeframe: {
      from: dateToString(new Date()),
      to: dateToString(new Date()),
    },
    exceptions: [],
    eventTypes: [],
  });

  function submit() {
    setContext('root', editableRootToRoot($root));
  }
</script>

<form on:submit|preventDefault={submit}>
  <RootForm bind:root={$root} />

  <button class="btn btn-success mt-2" on:click={submit}>
    <ContentSave /> Save
  </button>
</form>
