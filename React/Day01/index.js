// const React = {
//   createElement: function (tag, attributes, children) {
//     const element = document.createElement(tag);
//     element.textContent = children;
//     for (let key in attributes) {
//       if (key == "style") {
//         Object.assign(element.style, attributes.style);
//       } else {
//         element[key] = attributes[key];
//       }
//     }
//     return element;
//   },
// };

// react light weight object

const React = {
  createElement: function (tag, attributes, children) {
    return {
      type: tag,
      props: {
        ...attributes,
        children,
      },
    };
  },
};

const element1 = React.createElement(
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
// root.append(element);
// root.append(element2);

// const ReactDom = {
//   render: function (child, parent) {
//     parent.append(child);
//   },
// };

const ReactDOM = {
  render: function (reactElement, parent) {
    const element = document.createElement(reactElement.type);

    for (const key in reactElement.props) {
      if (key == "style") {
        Object.assign(element.style, reactElement.props.style);
      } else if (key == "children") {
        element.textContent = reactElement.props.children;
      } else {
        element[key] = reactElement.props[key];
      }
    }
    parent.innerHTML = "";
    parent.append(element);
  },
};

ReactDOM.render(element1, root);
ReactDOM.render(element2, root);
