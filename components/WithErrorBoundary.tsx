"use client";

import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error }: { error: unknown }) => (
  <div role="alert">
    <h2>Something went wrong</h2>
    <pre style={{ whiteSpace: "pre-wrap", color: "var(--error)" }}>
      {error instanceof Error ? error.message : String(error)}
    </pre>
  </div>
);

const WithErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
);

export default WithErrorBoundary;
