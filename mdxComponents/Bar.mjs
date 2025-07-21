import * as ReactModule from "react";

// react server component
const Bar = ({ runtimeProps }) => {
  const { React = ReactModule } = runtimeProps;

  // for escaping pre-rendering error
  if (!React) {
    return "<Bar /> server component doesn't work due to missing React instance";
  }

  React.useId(); // for testing

  return React.createElement(
    "span",
    { style: { color: "var(--primary)" } },
    "Imports work, Hello from imported ",
    React.createElement("code", null, "<Bar />"),
    " server component."
  );
};

export default Bar;
