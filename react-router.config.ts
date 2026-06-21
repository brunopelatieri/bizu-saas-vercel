import { vercelPreset } from "@vercel/react-router/vite";
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  // SSR global; dashboard permanece client-only (sem loader de servidor).
  ssr: true,
  presets: [vercelPreset()],
  // Opt-in antecipado ao comportamento do React Router v8 (silencia warnings no build).
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
