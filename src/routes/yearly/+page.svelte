<script lang="ts">
  import { getContext } from 'svelte';
  import moment from 'moment';
  import { matchingEvents } from '$lib/eventMatcher';
  import { colorToRgb } from '$lib/colorHelper';
  import { momentDateToDay } from '../../model/momentUtils';
  import type { Root } from '../../model';
  import type { Writable } from 'svelte/store';

  const rootContext = getContext<Writable<Root>>('root');
  const monthNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  function computeDuration(root: Root) {
    return moment.duration(moment(root.timeframe.to).endOf('month').diff(moment(root.timeframe.from).startOf('month')));
  }
  const months: moment.Moment[][] = [];
  if ($rootContext) {
    for (let i = 0; i < computeDuration($rootContext).months(); i++) {
      const monthStartDate = moment($rootContext.timeframe.from).add(i, 'months');
      const daysInMonth = monthStartDate.daysInMonth();

      const month = [];
      for (let i = 0; i < daysInMonth; i++) {
        month.push(moment(monthStartDate).add(i, 'days'));
      }
      months.push(month);
    }
  }
</script>

<div class="flex flex-1">
  {#each months as month}
    <div class="flex flex-col flex-1">
      <div class="text-3xl font-bold text-center">
        {monthNames[month[0].month()]}
      </div>
      {#each month as day}
        <div class="p-1 flex flex-row border">
          <div class="mr-1">{day.date().toString().padStart(2, '0')}</div>
          <div class="mr-2 w-24">{dayNames[momentDateToDay(day.day())]}</div>
          <div class="flex flex-1">
            {#if matchingEvents(day, $rootContext).length > 0}
              {#each matchingEvents(day, $rootContext) as event}
                <div class="h-full w-full px-2" style="background-color: {colorToRgb(event.color)}">
                  {event.name}
                </div>
              {/each}
            {:else}
              <div class="py-1" />
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>
