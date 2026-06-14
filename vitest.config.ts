import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Separate from vite.config.ts so the TanStack Router plugin (which regenerates
// routeTree.gen.ts) stays out of the test run. Tests import components directly.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // unit/integration tests live in ./tests; e2e specs live in ./e2e and are
    // driven by Playwright, not Vitest
    include: ["tests/**/*.test.{ts,tsx}"],
    css: false,
  },
});
