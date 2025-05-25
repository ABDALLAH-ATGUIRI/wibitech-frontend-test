import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: "/wibitech-frontend-test/",
    publicDir: "public", // Ensure assets in public folder are served correctly
    preview: {
      headers: {
        "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    plugins: [react()],

    css: {
      postcss: {
        plugins: [tailwind()],
      },
    },

    server: {
      proxy: {
        "^/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
  };
});
