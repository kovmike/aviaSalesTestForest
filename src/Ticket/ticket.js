import { combine } from "effector";
import { h, spec, list, remap } from "forest";
import { formatDuration, formatRange, formatStops, formatPrice } from "../lib";
import { styleTicket, styleSegments, stylePart, stylePartHeader, stylePartInfo, stylePrice, styleLogo } from "./styles";
//    //pics.avs.io/99/36/${carrier}.png

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
      h("div", { text: price.map((p) => formatPrice(p)), style: stylePrice });
      h("div", () => {
        spec({ style: styleLogo });
        h("img", { attr: { src: carrier.map((c) => `//pics.avs.io/99/36/${c}.png`) } });
      });
    });

    list({
      source: segments,
      fn: ({ store: segments }) => {
        const [origin, destination, date, stops, duration] = remap(segments, ["origin", "destination", "date", "stops", "duration"]);

        h("div", () => {
          spec({ style: styleSegments });
          //временной отрезок
          h("div", () => {
            spec({ style: stylePart });
            h("div", { text: combine(origin, destination, (o, d) => o + " - " + d), style: stylePartHeader });
            h("div", { text: combine(date, duration, (date, duration) => formatRange(date, duration)), style: stylePartInfo });
          });
          //в пути
          h("div", () => {
            spec({ style: stylePart });
            h("div", { text: "В ПУТИ", style: stylePartHeader });
            h("div", { text: duration.map((d) => formatDuration(d)), style: stylePartInfo });
          });
          //колво пересадок
          h("div", () => {
            spec({ style: stylePart });
            h("div", { text: stops.map((s) => formatStops(s.length)), style: stylePartHeader });
            h("div", { text: stops.map((st) => (st.length === 0 ? "Прямой" : st.join`,`)), style: stylePartInfo });
          });
        });
      },
    });
  });
};
