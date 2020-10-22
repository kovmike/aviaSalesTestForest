import { combine } from "effector";
import { h, spec, list, remap } from "forest";

const styleTicket = {
  marginTop: "20px",
  marginBottom: "20px",
  padding: "20px",
  width: "100%",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
  backgroundColor: "white",
};

const styleSegments = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const stylePrice = {
  flexBasis: "calc(100% * 2 / 3)",
  fontSize: "24px",
  lineHeight: "1",
  color: "#2196f3",
};
export const ticket = (price, carrier, segments) => {
  return h("div", () => {
    spec({ style: styleTicket });

    h("div", () => {
      spec({
        style: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        },
      });
      h("div", { text: price, style: stylePrice });
      h("div", { text: carrier });
    });

    list({
      source: segments,
      fn: ({ store: segments }) => {
        const [origin, destination, date, stops, duration] = remap(segments, ["origin", "destination", "date", "stops", "duration"]);

        h("div", () => {
          spec({ style: styleSegments });
          h("div", {
            text: combine(origin, destination, (o, d) => o + " -> " + d),
          });
          h("div", { text: duration });
          h("div", { text: stops.map((s) => "пересадок" + s.length) });
        });
      },
    });
  });
};
