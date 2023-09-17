<script lang="ts">
  import type { EventType } from '../model';

  export let eventTypes: EventType[];
  const tags = new Set(eventTypes.flatMap((it) => Array.from(it.tags)));
</script>

<select name="tags" id="tags" multiple>
  {#each tags as tag}
    <option value={tag}>{tag}</option>
  {/each}
</select>
