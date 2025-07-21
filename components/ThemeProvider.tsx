"use client";

import {
  ThemeProvider as _ThemeProvider,
  type ThemeProviderProps,
} from "next-themes";

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <_ThemeProvider enableSystem={false}>{children}</_ThemeProvider>;
}
