import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          "framer": ["framer-motion"],
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    target: "es2020",
    minify: "esbuild",
  },
});
