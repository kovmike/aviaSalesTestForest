import { h, spec } from "forest";
import { styleLine, styleButton } from "./style";
import { $bgColor, $color, click } from "./model";

const sortLine = () => {
  return h("div", () => {
    spec({ style: styleLine });

    h("button", {
      text: "САМЫЙ ДЕШЕВЫЙ",
      style: styleButton,
      styleVar: {
        backgroundColor: $bgColor.map((s) => s.c),
        color: $color.map((color) => color.c),
      },
      handler: { on: { click: click.prepend(() => "c") } },
    });

    h("button", {
      text: "САМЫЙ БЫСТРЫЙ",
      style: { ...styleButton, borderRadius: "0 5px 5px 0" },
      styleVar: {
        backgroundColor: $bgColor.map((s) => s.f),
        color: $color.map((color) => color.f),
      },
      handler: { on: { click: click.prepend(() => "f") } },
    });
  });
};

export { sortLine, $bgColor };
