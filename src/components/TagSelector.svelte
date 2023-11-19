<script lang="ts">
  import type { EventType } from '../model';

  export let eventTypes: EventType[];
  export let selected: string[];
  export let selectionCallback: (tags: string[]) => void;

  const tags = new Set(eventTypes.flatMap((it) => Array.from(it.tags)).sort());

  console.log('Tags sorted:', tags);
  function tagSelected(tag: string, currentlyChecked: boolean) {
    if (currentlyChecked) {
      selectionCallback(selected.filter((it) => it != tag));
    } else {
      selectionCallback([...selected, tag]);
    }
  }
</script>

<div class="grid gap-4 grid-cols-6">
  {#each tags as tag, i}
    <div>
      <label for={`tag-selector-${i}`}>{tag}</label>
      <input
        id={`tag-selector-${i}`}
        type="checkbox"
        on:change={() => tagSelected(tag, selected.includes(tag))}
        checked={selected.includes(tag)}
      />
    </div>
  {/each}
</div>
