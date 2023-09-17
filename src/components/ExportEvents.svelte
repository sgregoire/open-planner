<script lang="ts">
  import { getContext, hasContext } from 'svelte';
  import type { Root } from '../model';
  import type { Writable } from 'svelte/store';
  import Download from 'svelte-material-icons/Download.svelte';

  const root = getContext<Writable<Root>>('root');

  function download() {
    const content = JSON.stringify($root);
    const url = window.URL.createObjectURL(new Blob([content]));
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'export.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
</script>

<button class="btn btn-ghost" on:click={download} disabled={!hasContext('root')}>
  <Download />Export
</button>
