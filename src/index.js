import { using, h, spec, list, remap } from "forest";
import { ticket } from "./ticket";
import { filterStops } from "./filterStops";
import { $displayTickets, getSearchIdFx, getTicketListFx } from "./model";

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
      style: { display: "flex", flexDirection: "row" },
    });

    h("div", () => {
      spec({
        style: {
          display: "flex",
          flexDirection: "column",
          marginRight: "30px",
          height: "150px",
          width: "150px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
        },
      });

      filterStops();
    });

    h("div", () => {
      spec({
        attr: { class: "ticketList" },
        style: { display: "flex", flexDirection: "column" },
      });
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
