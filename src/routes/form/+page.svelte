<script lang="ts">
  import { writable, type Writable } from 'svelte/store';
  import { editableRootToRoot, rootToEdiable } from '../../model/form/mappers';
  import RootForm from '../../components/form/RootForm.svelte';
  import type { EditableRoot } from '../../model/form/EditableRoot';
  import { getContext, onMount } from 'svelte';
  import type { Root } from '../../model';
  import ContentSave from 'svelte-material-icons/ContentSave.svelte';
  import Loading from '../../components/Loading.svelte';

  const rootContextStore: Writable<Root> = getContext('root');

  const writableEditableRootStore = writable<EditableRoot>();

  function submit() {
    rootContextStore.set(editableRootToRoot($writableEditableRootStore));
  }

  onMount(() => {
    rootContextStore.subscribe((root) => {
      writableEditableRootStore.set(rootToEdiable(root));
    });
  });
</script>

{#if $writableEditableRootStore}
  <form on:submit|preventDefault={submit}>
    <RootForm bind:root={$writableEditableRootStore} />

    <button class="btn btn-success mt-2" on:click={submit}>
      <ContentSave /> Save
    </button>
  </form>
{:else}
  <Loading />
{/if}
