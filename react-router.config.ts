import { vercelPreset } from "@vercel/react-router/vite";
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  // SSR global; dashboard permanece client-only (sem loader de servidor).
  ssr: true,
  presets: [vercelPreset()],
} satisfies Config;
