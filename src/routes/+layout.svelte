<script>
  import '../app.css';
  import ExportEvents from '../components/ExportEvents.svelte';
  import ImportEvents from '../components/ImportEvents.svelte';
  import CalendarWeekend from 'svelte-material-icons/CalendarWeekend.svelte';
  import CalendarMonth from 'svelte-material-icons/CalendarMonth.svelte';
  import Pencil from 'svelte-material-icons/Pencil.svelte';
  import { base } from '$app/paths';
</script>

<div class="navbar bg-base-300 mb-8">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href={`${base}/`}>OpenPlanner</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a href={`${base}/form`}><Pencil />Edit</a></li>
      <li><a href={`${base}/weekly`}><CalendarWeekend />weekly</a></li>
      <li><a href={`${base}/yearly`}><CalendarMonth />Yearly</a></li>
      <li><ImportEvents /></li>
      <li><ExportEvents /></li>
    </ul>
  </div>
</div>
<div class="container mx-auto">
  <slot />
</div>
