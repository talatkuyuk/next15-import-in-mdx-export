import * as ReactModule from "react";

// client component due to "useState" hook, but it is treated as rsc
// the directive "use client"; doesn't work
function ExampleForm({ runtimeProps }) {
  const { React = ReactModule } = runtimeProps;

  // for escaping pre-rendering error
  if (!React) {
    return "<ExampleForm /> client component doesn't work due to missing React instance";
  }

  // for escaping pre-rendering error
  if (!React.useState) {
    return "<ExampleForm /> client component doesn't work due to lack of React.useState in the server";
  }

  const id = React.useId(); // Generates a unique ID
  const [name, setName] = React.useState("");
  return React.createElement(
    "div",
    null,
    React.createElement("label", { htmlFor: `${id}-name` }, "Enter your name:"),
    React.createElement("input", {
      id: `${id}-name`,
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
    }),
    React.createElement("p", null, `Hello, ${name || "stranger"} !`)
  );
}
export default ExampleForm;
