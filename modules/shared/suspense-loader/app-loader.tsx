import React, { Suspense } from "react";
import ErrorBoundary from "../components/error-boundary";
import AppAnimation from "./app-animation";

function AppLoader({
  children,
  size = 86,
  fallback,
}: {
  children: any;
  size?: number;
  fallback?: JSX.Element;
}) {
  return (
    <Suspense fallback={fallback ?? <AppAnimation size={size} />}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
}

export default AppLoader;