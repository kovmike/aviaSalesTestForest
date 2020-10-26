import { createEffect, createEvent, createStore, sample, forward } from "effector";
import { $bgColor } from "./Sorting/";

const FILTERS = [
  { value: -1, active: true, label: "Все" },
  { value: 0, active: false, label: "Без пересадок" },
  { value: 1, active: false, label: "пересадка" },
  { value: 2, active: false, label: "пересадки" },
  { value: 3, active: false, label: "пересадки" },
];

const totalDuration = (ticket) => {
  return ticket.segments.reduce((acc, seg) => {
    return acc + seg.duration;
  }, 0);
};
const filterChecked = createEvent();
const sorted = createEvent();

const $filters = createStore(FILTERS);
const $tickets = createStore([]);

//https://front-test.beta.aviasales.ru/search  ---> searchID --->
//https://front-test.beta.aviasales.ru/tickets?searchId={searchID}
const getSearchIdFx = createEffect(async () => {
  const res = await fetch("https://front-test.beta.aviasales.ru/search");
  return res.json();
});

const getTicketListFx = createEffect(async ({ searchId }) => {
  const res = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
  return res.json();
});

/*** */
$filters.on(filterChecked, (filters, activateFilter) => {
  //ужас какой-то
  if (filters.filter((filter) => filter.value >= 0 && filter.active).length === 0 && activateFilter === -1) return [...filters];
  if (activateFilter === -1) {
    return filters.map((filter) => (filter.value === -1 ? { ...filter, active: true } : { ...filter, active: false }));
  } else {
    const changedFilters = filters.map((filter) => {
      if (filter.value === -1) return { ...filter, active: false };
      return filter.value === activateFilter ? { ...filter, active: !filter.active } : filter;
    });
    if (changedFilters.filter((filter) => filter.value >= 0 && filter.active).length === changedFilters.length - 1)
      return changedFilters.map((f) => (f.value === -1 ? { ...f, active: true } : { ...f, active: false }));
    return changedFilters;
  }
});

$tickets
  .on(getTicketListFx.doneData, (_, { tickets }) => tickets)
  .on(sorted, (ticketList, [key]) => {
    return key === "c"
      ? [...ticketList].sort((tCur, tNext) => tCur.price - tNext.price)
      : [...ticketList].sort((tCur, tNext) => totalDuration(tCur) - totalDuration(tNext));
  });

/*** */
//guard(sorted, { filter: getTicketListFx.pending });
forward({
  from: getSearchIdFx.doneData,
  to: getTicketListFx,
});

sample({
  source: getTicketListFx.doneData,
  fn: () => -1,
  target: filterChecked,
});

sample({
  source: $bgColor,
  clock: getTicketListFx.doneData,
  fn: (bg) => Object.keys(bg).filter((key) => bg[key] !== "white"),
  target: sorted,
});
sample({
  source: $bgColor,

  fn: (bg) => Object.keys(bg).filter((key) => bg[key] !== "white"),
  target: sorted,
});

const $displayTickets = sample({
  source: { $tickets, $filters },
  fn: ({ $tickets, $filters }) => {
    const activeFilters = $filters.filter((f) => f.active);
    if (activeFilters.some((f) => f.value === -1)) return $tickets.slice(0, 5);
    return $tickets
      .filter((ticket) => {
        const stops = ticket.segments.map((s) => s.stops.length);

        return stops.every((stop) => activeFilters.some((af) => af.value === stop));
      })
      .slice(0, 5);
  },
});

export { getSearchIdFx, $displayTickets, $filters, filterChecked, getTicketListFx };
