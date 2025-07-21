"use client";

import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error }: { error: Error }) => (
  <div role="alert">
    <h2>Something went wrong</h2>
    <pre style={{ whiteSpace: "pre-wrap", color: "var(--error)" }}>
      {error.message}
    </pre>
  </div>
);

const WithErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
);

export default WithErrorBoundary;
