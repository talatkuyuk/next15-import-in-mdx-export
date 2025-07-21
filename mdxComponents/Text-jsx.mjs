import * as ReactModule from "react";

async function getData() {
  const res = await fetch("http://localhost:3000/api/text");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.text();
}

// react server component
export default async function Text() {
  const text = await getData();

  // for escaping pre-rendering error
  if (!text) return <span>pre-rendering error ocuured !</span>;

  return (
    <span style={{ color: "var(--greenary)" }}>
      <span>{text}</span>
    </span>
  );
}
