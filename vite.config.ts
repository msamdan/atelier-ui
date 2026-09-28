/// <reference types="vitest" />
import { defineConfig } from "vite";
import analog from "@analogjs/platform";
export default defineConfig({
  build: { target: ["es2020"] },
  resolve: { mainFields: ["module"] },
  optimizeDeps: {
    include: [
      "@angular/forms",
      "@taiga-ui/core",
      "@taiga-ui/core/components/textfield",
      "@taiga-ui/kit",
    ],
  },
  server: { host: "127.0.0.1", watch: { usePolling: true, interval: 500 } },
  plugins: [analog({ ssr: false })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test-setup.ts"],
    include: ["src/**/*.spec.ts"],
    reporters: ["default"],
  },
});
