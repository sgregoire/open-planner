<script lang="ts">
  import moment from 'moment';
  import { root } from '../../model/my-events';
  import { matchingEvents } from '$lib/eventMatcher';
  import { colorToRgb } from '$lib/colorHelper';
  import { momentDateToDay } from '../../model/momentUtils';

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

  const duration = moment.duration(
    moment(root.timeframe.to).endOf('month').diff(moment(root.timeframe.from).startOf('month')),
  );
  const months: moment.Moment[][] = [];
  for (let i = 0; i < duration.months(); i++) {
    const monthStartDate = moment(root.timeframe.from).add(i, 'months');
    const daysInMonth = monthStartDate.daysInMonth();

    const month = [];
    for (let i = 0; i < daysInMonth; i++) {
      month.push(moment(monthStartDate).add(i, 'days'));
    }
    months.push(month);
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
          <div class="mr-1">{day.date()}</div>
          <div class="mr-2">{momentDateToDay(day.day())}</div>
          <div class="flex flex-1">
            {#if matchingEvents(day, root).length > 0}
              {#each matchingEvents(day, root) as event}
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
