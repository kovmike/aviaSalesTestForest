import { list, h, spec } from "forest";
import { createEvent, sample, combine } from "effector";
import { $filters, filterChecked } from "./model";

const filterStops = () =>
  list({
    source: $filters,
    fields: ["value", "active", "label"],
    fn: ({ fields: [value, active, label] }) => {
      const checkBoxClicked = createEvent();
      sample({
        source: value,
        clock: checkBoxClicked,
        target: filterChecked,
      });
      h("div", () => {
        h("input", () => {
          spec({
            attr: { type: "checkbox", value, checked: active },
            handler: {
              config: { prevent: true }, //интересная реакция на орфографическую ошибку в названии свойства
              on: { click: checkBoxClicked },
            },
          });
        });
        h("label", { text: combine(value, label, (value, label) => (value < 1 ? label : `${value} ${label}`)) });
      });
    },
  });

export { filterStops };
