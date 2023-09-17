<script>
  import '../app.css';
  import ExportEvents from '../components/ExportEvents.svelte';
  import ImportEvents from '../components/ImportEvents.svelte';
  import CalendarWeekend from 'svelte-material-icons/CalendarWeekend.svelte';
  import CalendarMonth from 'svelte-material-icons/CalendarMonth.svelte';
  import Pencil from 'svelte-material-icons/Pencil.svelte';
  import { hasContext } from 'svelte';
</script>

<div class="w-full bg-primary mb-3 px-6 py-2 flex flex-auto">
  <div class="self-start">
    <a class="btn btn-ghost" href="/">
      <h1>OpenPlanner</h1>
    </a>
  </div>
  <div class="flex grow justify-end gap-x-4">
    {#if hasContext('root')}
      <a href="/weekly" class="btn btn-ghost"><CalendarWeekend />weekly</a>
      <a href="/yearly" class="btn btn-ghost"><CalendarMonth />Yearly</a>
    {/if}
    <a href="/form" class="btn btn-ghost"><Pencil />Edit</a>
    <ImportEvents />
    <ExportEvents />
  </div>
</div>
<div class="container mx-auto">
  <slot />
</div>
