import { using, h, spec, list, remap } from "forest";
import { ticket } from "./Ticket/ticket";
import { filterStops } from "./Filter/filterStops";
import { sortLine } from "./Sorting/sorting";
import { $displayTickets, getSearchIdFx, getTicketListFx } from "./model";
import { styleFilter, styleTicketList, styleMain } from "./style";

using(document.getElementById("root"), () => {
  getSearchIdFx();

  h("div", {
    text: "ЛОАДИНГ...",
    visible: getTicketListFx.pending,
    style: { fontSize: "25px", color: "rgba(7,7,7,0.5)" },
  });

  h("div", () => {
    spec({
      attr: { class: "content" },
      style: styleMain,
    });

    h("div", () => {
      spec({
        text: "Количество пересадок".toLocaleUpperCase(),
        style: styleFilter,
      });

      filterStops();
    });

    h("div", () => {
      spec({
        attr: { class: "ticketList" },
        style: styleTicketList,
      });
      sortLine();
      list({
        source: $displayTickets,
        fn: ({ store: tickets }) => {
          const [price, carrier, segments] = remap(tickets, ["price", "carrier", "segments"]);
          ticket(price, carrier, segments);
        },
      });
    });
  });
});
