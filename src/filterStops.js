import { list, h, spec } from "forest";
import { createEvent, sample } from "effector";
import { $filters, filterChecked } from "./model";

const filterStops = () =>
  list({
    source: $filters,
    fields: ["value", "active"],
    fn: ({ fields: [value, active] }) => {
      const checkBoxClicked = createEvent();
      sample({
        source: value,
        clock: checkBoxClicked,
        target: filterChecked,
      });
      h("input", () => {
        spec({
          attr: { type: "checkbox", value, checked: active },
          handler: {
            config: { prevent: true },
            on: { click: checkBoxClicked },
          },
        });
      });
    },
  });

export { filterStops };
