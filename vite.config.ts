import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import fs from "node:fs";

const MAX_CHUNK_SIZE_BYTES = 100 * 1024; // 100 KB

/**
 * Chunk name prefixes allowed to exceed 100 KB (framework/shared code we can't split):
 * - entry.client-: React Router client runtime
 * - react-dom-: React DOM (single bundle, ~180 KB)
 * - index-: Rollup shared async chunk (lazy route dependencies)
 */
const EXEMPT_CHUNK_PREFIXES = ["entry.client-", "react-dom-", "index-"];

function manualChunks(id: string): string | undefined {
  // App code — split so no single chunk gets too large
  if (id.includes("/src/") && !id.includes("node_modules")) {
    if (
      id.includes("/src/locales/") ||
      (id.includes("src/") && id.endsWith(".json"))
    )
      return "locales";

    if (id.includes("/src/i18n")) return "i18n-app";
    if (id.includes("/src/shared/ui/button")) return "shared-ui-button";
    if (id.includes("/src/shared/ui/glass-card")) return "shared-ui-glass-card";
    if (id.includes("/src/shared/ui/lazy-load-image")) return "shared-ui-lazy";
    if (id.includes("/src/shared/ui/icons")) return "shared-ui-icons";
    if (id.includes("/src/shared/lib/")) return "shared-lib";
    if (id.includes("/src/shared/hooks/")) return "shared-hooks";
    if (id.includes("/src/shared/utils/")) return "shared-utils";
    if (id.includes("/src/shared/")) return "shared-app";
    if (id.includes("/src/entities/")) return "entities";
    if (id.includes("/src/features/")) return "features";
  }

  if (!id.includes("node_modules")) return undefined;
  // React core — split so no single chunk exceeds 100 KB
  if (id.includes("react-dom/")) return "react-dom";
  if (id.includes("scheduler/")) return "scheduler";
  if (id.includes("react/")) return "react";
  if (id.includes("react-router")) return "react-router";
  // i18n
  if (id.includes("i18next") || id.includes("react-i18next")) return "i18n";
  // Forms
  if (
    id.includes("react-hook-form") ||
    id.includes("@hookform/resolvers") ||
    id.includes("/zod/")
  ) {
    return "forms";
  }
  if (id.includes("/swr/")) return "swr";
  // UI / icons
  if (
    id.includes("lucide-react") ||
    id.includes("radix-ui") ||
    id.includes("class-variance-authority") ||
    id.includes("clsx") ||
    id.includes("tailwind-merge") ||
    id.includes("tw-animate-css") ||
    id.includes("shadcn/")
  ) {
    return "ui";
  }
  // Geist font
  if (id.includes("@fontsource-variable/geist")) return "font-geist";
  return undefined;
}

function enforceChunkSizePlugin(clientOutDir: string) {
  return {
    name: "enforce-chunk-size",
    closeBundle() {
      const assetsDir = path.join(clientOutDir, "assets");
      if (!fs.existsSync(assetsDir)) return;
      const files = fs.readdirSync(assetsDir);
      const oversize: { file: string; size: number }[] = [];
      for (const file of files) {
        if (!file.endsWith(".js")) continue;
        const exempt = EXEMPT_CHUNK_PREFIXES.some((prefix) =>
          file.startsWith(prefix)
        );
        if (exempt) continue;
        const filePath = path.join(assetsDir, file);
        const stat = fs.statSync(filePath);
        if (stat.size > MAX_CHUNK_SIZE_BYTES) {
          oversize.push({ file, size: stat.size });
        }
      }
      if (oversize.length > 0) {
        const list = oversize
          .map(({ file, size }) => `  ${file}: ${(size / 1024).toFixed(2)} KB`)
          .join("\n");
        throw new Error(
          `Chunk size limit (100 KB) exceeded:\n${list}\nSplit these chunks, add to EXEMPT_CHUNK_PREFIXES, or increase MAX_CHUNK_SIZE_BYTES.`
        );
      }
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    enforceChunkSizePlugin(path.join(process.cwd(), "build", "client")),
  ],
  server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 100,
    rollupOptions: {
      output: {
        manualChunks,
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
