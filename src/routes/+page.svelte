<script lang="ts">
  import { root } from '../model/my-events';
  import { generateColors } from '../lib/color-generator';
  import { colorToRgb } from '$lib/colorHelper';

  const colors = generateColors(root.eventTypes.filter((it) => it.color === undefined).length);
  let cnt = 0;
  for (const event of root.eventTypes) {
    if (event.color === undefined) {
      event.color = colors[cnt];
      cnt++;
    }
  }
</script>

<h1>Hello, world!</h1>
