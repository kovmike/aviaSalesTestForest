import { createEffect, createEvent, createStore, sample } from "effector";

const FILTERS = [
  { value: -1, active: true },
  { value: 0, active: false },
  { value: 1, active: false },
  { value: 2, active: false },
  { value: 3, active: false },
];

const filterChecked = createEvent();

const $filters = createStore(FILTERS);
const $tickets = createStore([]);

//https://front-test.beta.aviasales.ru/search  ---> searchID --->
//https://front-test.beta.aviasales.ru/tickets?searchId={searchID}
const getSearchIdFx = createEffect(async () => {
  const res = await fetch("https://front-test.beta.aviasales.ru/search");
  return res.json();
});

const getTicketListFx = createEffect(async (searchId) => {
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

$tickets.on(getTicketListFx.doneData, (_, payload) => payload.tickets.filter((_, i) => i < 20));

/*** */
sample({
  source: getSearchIdFx.doneData,
  fn: (searchPayload) => searchPayload.searchId,
  target: getTicketListFx,
});

sample({
  source: getTicketListFx.doneData,
  fn: () => -1,
  target: filterChecked,
});

const $displayTickets = sample({
  source: $tickets,
  clock: $filters,
  fn: (tickets, filters) => {
    const activeFilters = filters.filter((f) => f.active);
    if (activeFilters.some((f) => f.value === -1)) return tickets;
    return tickets.filter((ticket) => {
      const stops = ticket.segments.map((s) => s.stops.length);

      return stops.every((stop) => activeFilters.some((af) => af.value === stop));
    });
  },
});

export { getSearchIdFx, $displayTickets, $filters, filterChecked, getTicketListFx };
