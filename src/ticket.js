import { combine } from "effector";
import { h, spec, list, remap } from "forest";
import { formatDuration } from "./lib/formatDuration";
import { formatRange } from "./lib/formatRange";
import { formatStops } from "./lib/formatStops";

//    //pics.avs.io/99/36/${carrier}.png
//TODO refactor
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
  fontFamily: `"Open Sans",Tahoma, sans-serif`,

  marginBottom: "15px",
};

const stylePrice = {
  flexBasis: "calc(100% * 2 / 3)",
  fontFamily: `"Open Sans",Tahoma, sans-serif`,
  fontWeight: "bold",
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
          marginBottom: "15px",
        },
      });
      h("div", { text: price, style: stylePrice });
      h("img", { attr: { src: carrier.map((c) => `//pics.avs.io/99/36/${c}.png`) } });
    });

    list({
      source: segments,
      fn: ({ store: segments }) => {
        const [origin, destination, date, stops, duration] = remap(segments, ["origin", "destination", "date", "stops", "duration"]);

        h("div", () => {
          spec({ style: styleSegments });
          //временной отрезок
          h("div", () => {
            h("div", { text: combine(origin, destination, (o, d) => o + " - " + d) });
            h("div", { text: combine(date, duration, (date, duration) => formatRange(date, duration)) });
          });
          //в пути
          h("div", () => {
            spec({});
            h("div", { text: "В ПУТИ" });
            h("div", { text: duration.map((d) => formatDuration(d)) });
          });
          //колво пересадок
          h("div", () => {
            h("label", { text: stops.map((s) => formatStops(s.length)) });
            h("br", {});
            h("label", { text: stops.map((st) => (st.length === 0 ? "Прямой" : st.join`,`)) });
          });
        });
      },
    });
  });
};
