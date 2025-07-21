import * as ReactModule from "react";

async function getData() {
  try {
    const res = await fetch(
      "https://en.wikipedia.org/api/rest_v1/page/random/summary"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const { title } = await res.json();

    return (
      "Hello from imported <Text /> server component" +
      " --> " +
      title.match(/^([\w'-]+)/)?.[0] // first word of a title
    );
  } catch (error) {
    console.error("Fetch failed:", error);
    return "Error: loading content catched in the function";
  }
}

// react server component
export default async function Text({ runtimeProps }) {
  const { React = ReactModule } = runtimeProps;

  // for escaping pre-rendering error
  if (!React) {
    return "<Text /> server component doesn't work due to missing React instance";
  }

  let text;

  try {
    text = await getData();
  } catch {
    text = "Error: loading content catched in the component"; // Ensure it's never null or undefined
  }

  // for escaping pre-rendering error
  if (!text) return "pre-rendering error ocuured !";

  return React.createElement(
    "span",
    { style: { color: "var(--greenary)" } },
    React.createElement("span", null, text)
  );
}
