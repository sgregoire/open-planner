<script lang="ts">
  import '../app.css';
  import ExportEvents from '../components/ExportEvents.svelte';
  import ImportEvents from '../components/ImportEvents.svelte';
  import CalendarWeekend from 'svelte-material-icons/CalendarWeekend.svelte';
  import CalendarMonth from 'svelte-material-icons/CalendarMonth.svelte';
  import Pencil from 'svelte-material-icons/Pencil.svelte';
  import { base } from '$app/paths';
  import { onDestroy, onMount, setContext } from 'svelte';
  import { writable, type Unsubscriber } from 'svelte/store';
  import type { Root } from '../model';
  import { rootDecoder } from '$lib/decoders';

  const defaultRoot: Root = {
    timeframe: {
      from: new Date(),
      to: new Date(),
    },
    eventTypes: [],
    exceptions: [],
  };

  const rootStore = writable(defaultRoot);
  setContext('root', rootStore);

  let unsubscribe: Unsubscriber | undefined = undefined;
  onMount(() => {
    const rootStr = localStorage.getItem('root');

    if (rootStr) {
      rootStore.set(rootDecoder.value(JSON.parse(rootStr)) ?? defaultRoot);
    }

    unsubscribe = rootStore.subscribe((root) => {
      localStorage.setItem('root', JSON.stringify(root));
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>

<div class="navbar bg-base-300 mb-8">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href={`${base}/`}>OpenPlanner</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a href={`${base}/form`}><Pencil />Edit</a></li>
      <li><a href={`${base}/weekly`}><CalendarWeekend />Weekly</a></li>
      <li><a href={`${base}/yearly`}><CalendarMonth />Yearly</a></li>
      <li><ImportEvents /></li>
      <li><ExportEvents /></li>
    </ul>
  </div>
</div>
<div class="container mx-auto">
  <slot />
</div>
