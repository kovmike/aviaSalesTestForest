import { h, spec } from "forest";
import { createStore, createEvent, sample } from "effector";

const styleLine = {
  width: "100%",
  marginBottom: "20px",
  height: "50px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
};
const styleButton = {
  borderRadius: "5px 0 0 5px",
  fontWeight: "bold",
  textRendering: "auto",
  width: "50%",
  padding: "0 20px",
  height: "100%",
  border: "none",
  outline: "none",
  color: "var(--color)",
  backgroundColor: "var(--backgroundColor)",
};
const $bgColor = createStore({ c: "rgb(33, 150, 243)", f: "white" });
const $color = createStore({ c: "white", f: "black" });
const click = createEvent("sorter changed");

$bgColor.on(click, (style, btnID) => (style[btnID] === "rgb(33, 150, 243)" ? style : { ...style, c: style.f, f: style.c }));

//$bgColor.watch(console.log);

sample({
  source: $bgColor,
  fn: (bg) => (bg.c === "rgb(33, 150, 243)" ? { c: "white", f: "black" } : { c: "black", f: "white" }),
  target: $color,
});

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
