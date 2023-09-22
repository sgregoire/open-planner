<script lang="ts">
  import { setContext } from 'svelte';
  import { rootChecker } from '$lib/checkers';
  import { rootDecoder } from '$lib/decoders';
  import { writable } from 'svelte/store';
  import { generateColors } from '$lib/color-generator';
  import type { Root } from '../model';
  import Upload from 'svelte-material-icons/Upload.svelte';

  let file = writable<null | File>(null);
  let loading = writable(false);
  let fileInput: HTMLInputElement;
  function selectFile() {
    fileInput.click();
  }

  function onFileInput(event: Event) {
    if (event.target) {
      const input = event.target as HTMLInputElement;
      if (input && input.files?.length == 1) {
        $file = input.files[0];
      }
    }
  }

  file.subscribe(async (file) => {
    if (file) {
      $loading = true;
      const text = await file.text();
      const json = JSON.parse(text);
      const res = rootDecoder.decode(json);
      if (res.ok) {
        if (rootChecker(res.value)) {
          const root: Root = res.value;
          const colors = generateColors(root.eventTypes.filter((it) => it.color === undefined).length);
          let cnt = 0;
          for (const event of root.eventTypes) {
            if (event.color === undefined) {
              event.color = colors[cnt];
              cnt++;
            }
          }
          // Put in state
          setContext('root', writable(root));
        }
      } else {
        console.log(res.error);
      }
      $loading = false;
    }
  });
</script>

<input bind:this={fileInput} type="file" accept=".json" class="hidden" on:input={onFileInput} />

<button on:click={selectFile}>
  {#if $loading}
    <span class="loading loading-spinner" />
  {/if}
  <Upload />Import
</button>
