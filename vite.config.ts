import { sveltekit } from "@sveltejs/kit/vite";
import adapterBun from "@sveltejs/adapter-bun";
import adapterVercel from "@sveltejs/adapter-vercel";
import { svelteTesting } from "@testing-library/svelte/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number(env.APP_PORT || process.env.APP_PORT || 3005);

  // Vercel mengisi VERCEL=1 saat build; di luar itu tetap memakai adapter-bun.
  const adapter = process.env.VERCEL
    ? adapterVercel()
    : adapterBun({ out: "build", serverOptions: { port } });

  return {
    plugins: [tailwindcss(), sveltekit({ adapter }), svelteTesting()],
    server: { port, host: true },
    preview: { port, host: true },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/tests/setup.ts"],
      include: ["src/**/*.test.ts"],
      clearMocks: true,
      unstubEnvs: true,
      unstubGlobals: true,
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "lcov"],
        include: ["src/**/*.{ts,svelte}"],
        exclude: ["src/**/*.test.ts", "src/tests/**", "src/**/*.d.ts"],
        thresholds: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
    },
  };
});