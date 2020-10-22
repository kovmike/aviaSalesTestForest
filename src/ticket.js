import { combine } from "effector";
import { h, spec, list, remap } from "forest";

const styleTicket = {
  width: "400px",

  height: "100px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "6px",
  border: "1px solid black"
};
const styleSegments = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between"
};

export const ticket = (price, carrier, segments) => {
  return h("div", () => {
    spec({ style: styleTicket });

    h("div", () => {
      spec({
        style: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }
      });
      h("div", { text: price });
      h("div", { text: carrier });
    });

    list({
      source: segments,
      fn: ({ store: segments }) => {
        const [origin, destination, date, stops, duration] = remap(segments, [
          "origin",
          "destination",
          "date",
          "stops",
          "duration"
        ]);

        h("div", () => {
          spec({ style: styleSegments });
          h("div", {
            text: combine(origin, destination, (o, d) => o + " -> " + d)
          });
          h("div", { text: duration });
          h("div", { text: stops.map((s) => "пересадок" + s.length) });
        });
      }
    });
  });
};
