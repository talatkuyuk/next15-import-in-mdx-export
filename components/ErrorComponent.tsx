type Props = {
  error: Error | string;
};

export default function ErrorComponent({ error }: Props) {
  return (
    <div id="mdx-error" role="alert">
      <h2>Something went wrong</h2>
      <pre style={{ color: "var(--error)" }}>
        <code>{typeof error === "string" ? error : error.message}</code>
      </pre>
    </div>
  );
}
