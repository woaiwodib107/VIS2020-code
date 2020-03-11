import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import stores from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

var config = {
  content: [
    {
      type: "row",
      content: [
        {
          type: "component",
          componentName: "example",
          componentState: { text: "Component 1" }
        },
        {
          type: "component",
          componentName: "example",
          componentState: { text: "Component 2" }
        }
      ]
    }
  ]
};

var myLayout = new window.GoldenLayout(config, $("#root"));

myLayout.registerComponent("example", function(container, state) {
  container.getElement().html("<h2>" + state.text + "</h2>");
});

myLayout.init();

var addMenuItem = function(title, text) {
  var element = $("<li>" + text + "</li>");
  $("#menuContainer").append(element);

  var newItemConfig = {
    title: title,
    type: "component",
    componentName: "example",
    componentState: { text: text }
  };

  myLayout.createDragSource(element, newItemConfig);
};

addMenuItem("Add me!", "You've added me!");
addMenuItem("Me too!", "You've added me too!");

// var myLayout = new GoldenLayout({
//   content: [
//     {
//       type: "row",
//       content: [
//         {
//           type: "react-component",
//           component: "test-component",
//           props: { label: "A" }
//         },
//         {
//           type: "column",
//           content: [
//             {
//               type: "react-component",
//               component: "test-component",
//               props: { label: "B" }
//             },
//             {
//               type: "react-component",
//               component: "test-component",
//               props: { label: "C" }
//             }
//           ]
//         }
//       ]
//     }
//   ]
// });

// //Open the element with 'someId' in a new window
// myLayout.root.getItemsById("root")[0].popout();

// //Add another component to the layout
// myLayout.root.contentItems[0].addChild({
//   type: "react-component",
//   component: "testComponent",
//   props: { label: "X" }
// });

// var TestComponent = React.createClass({
//   render: function() {
//     return <h1>{this.props.label}</h1>;
//   }
// });

// myLayout.registerComponent("testComponent", TestComponent);

// //Once all components are registered, call
// myLayout.init();

// ReactDOM.render(
//     <Provider {...stores}>
//         <App />
//     </Provider>,
//     document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
