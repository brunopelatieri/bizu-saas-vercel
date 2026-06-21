import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  // v8_viteEnvironmentApi: custom server entry no ambiente SSR (substitui isSsrBuild).
  environments: {
    ssr: {
      build: {
        rollupOptions: {
          input: "./src/server.ts",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
