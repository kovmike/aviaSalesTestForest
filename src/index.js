import { using, h, spec, list, remap } from "forest";
import { ticket } from "./ticket";
import { filterStops } from "./filterStops";
import { $displayTickets, fetchFx } from "./model";

using(document.getElementById("root"), () => {
  fetchFx();

  h("div", {
    text: "ЛОАДИНГ...",
    visible: fetchFx.pending,
    style: { fontSize: "25px", color: "rgba(7,7,7,0.5)" }
  });

  h("div", () => {
    spec({
      attr: { class: "content" },
      style: { display: "flex", flexDirection: "row" }
    });

    h("div", () => {
      spec({
        style: {
          display: "flex",
          flexDirection: "column",
          height: "150px",
          width: "150px",
          border: "1px solid black",
          borderRadius: "5px"
        }
      });

      filterStops();
    });

    h("div", () => {
      spec({
        attr: { class: "ticketList" },
        style: { display: "flex", flexDirection: "column" }
      });
      list({
        source: $displayTickets,
        fn: ({ store: tickets }) => {
          const [price, carrier, segments] = remap(tickets, [
            "price",
            "carrier",
            "segments"
          ]);

          ticket(price, carrier, segments);
        }
      });
    });
  });
});
