import * as ReactModule from "react";

// react server component
const Bar = ({ runtimeProps }) => {
  const { React = ReactModule } = runtimeProps;

  // for escaping pre-rendering error
  if (!React) {
    return "<Bar /> server component doesn't work due to missing React instance";
  }

  React.useId(); // for testing

  return (
    <span style={{ color: "var(--primary)" }}>
      Imports work, so I am able to say HELLO from imported
      <code>
        <Bar />
      </code>
      server component.
    </span>
  );
};

export default Bar;
