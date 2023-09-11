<script lang="ts">
    import { root } from "../model/my-events";
	import { generateColors } from "../color-generator";
	import Yearly from "../components/Yearly.svelte";
	import Weekly from "../components/Weekly.svelte";

    const colors = generateColors(root.eventTypes.filter(it => it.color === undefined).length);
    let cnt = 0;
    for(const event of root.eventTypes) {
        if (event.color === undefined) {
            event.color = colors[cnt]
            cnt++;
        }
    }

    const eventColorRecord = root.eventTypes.map(it => ({ name: it.name, color: it.color?.toString(16) }));
    const tags = new Set(root.eventTypes.flatMap(it => Array.from(it.tags)));
</script>

<select name="tags" id="tags" multiple>
    {#each tags as tag}
        <option value="{tag}">{tag}</option>
    {/each}
</select>

<div class="flex">
    {#each eventColorRecord as event}
        <div class="p-1" style="background-color: #{event.color};">{event.name}</div>
    {/each}
</div>

<!-- <Yearly /> -->
<Weekly />