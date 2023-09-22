<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import { dateToString, editableRootToRoot, rootToEdiable } from '../../model/form/mappers';
  import RootForm from '../../components/form/RootForm.svelte';
  import type { EditableRoot } from '../../model/form/EditableRoot';
  import { getContext } from 'svelte';
  import type { Root } from '../../model';
  import ContentSave from 'svelte-material-icons/ContentSave.svelte';

  const rootContextStore: Writable<Root> = getContext('root');

  const writableEditableRootStore = writable<EditableRoot>(rootToEdiable($rootContextStore));
  rootContextStore.subscribe((root) => {
    writableEditableRootStore.set(rootToEdiable(root));
  });

  function submit() {
    rootContextStore.set(editableRootToRoot($writableEditableRootStore));
  }
</script>

<form on:submit|preventDefault={submit}>
  <RootForm bind:root={$writableEditableRootStore} />

  <button class="btn btn-success mt-2" on:click={submit}>
    <ContentSave /> Save
  </button>
</form>
