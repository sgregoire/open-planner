<script>
  import '../app.css';
  import ExportEvents from '../components/ExportEvents.svelte';
  import ImportEvents from '../components/ImportEvents.svelte';
</script>

<div class="w-full bg-primary mb-3 px-6 py-2 flex flex-auto">
  <div class="self-start">
    <a class="btn btn-ghost" href="/">
      <h1>OpenPlanner</h1>
    </a>
  </div>
  <div class="flex grow justify-end gap-x-4">
    <ImportEvents />
    <ExportEvents />
  </div>
</div>
<div class="container mx-auto">
  <slot />
</div>
