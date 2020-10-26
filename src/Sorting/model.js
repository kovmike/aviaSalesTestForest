import { createStore, createEvent, sample } from "effector";

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

export { $bgColor, $color, click };
