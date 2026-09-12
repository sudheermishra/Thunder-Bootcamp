const React = {
  createElement: function (tag, attributes, children) {
    const element = document.createElement(tag);
    element.textContent = children;
    for (let key in attributes) {
      if (key == "style") {
        Object.assign(element.style, attributes.style);
      } else {
        element[key] = attributes[key];
      }
    }
    return element;
  },
};

const element = React.createElement(
  "h1",
  {
    id: "first",
    className: "second",
    style: { backgroundColor: "pink", fontSize: "100px", color: "brown" },
  },
  "Hello Coder Army",
);
const element2 = React.createElement(
  "h2",
  {
    id: "third",
    className: "second",
    style: { backgroundColor: "brown", fontSize: "70px", color: "green" },
  },
  "Sab Changa si hai",
);

const root = document.getElementById("root");
root.append(element);
root.append(element2);
