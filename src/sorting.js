import { h, spec } from "forest";

const styleButton = {
  borderRadius: "5px 0 0 5px",
  fontWeight: "bold",
  textRendering: "auto",
  width: "50%",
  padding: "0 20px",
  height: "100%",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  border: "none",
  outline: "none",
  backgroundColor: "rgb(255, 255, 255)",
};

const styleLine = {
  width: "100%",
  marginBottom: "20px",
  height: "50px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
};

const sortLine = () => {
  return h("div", () => {
    spec({ style: styleLine });
    h("button", { text: "САМЫЙ ДЕШЕВЫЙ", style: { ...styleButton } });
    h("button", { text: "САМЫЙ БЫСТРЫЙ", style: { ...styleButton, borderRadius: "0 5px 5px 0", backgroundColor: "rgb(33, 150, 243)" } });
  });
};

export { sortLine };
