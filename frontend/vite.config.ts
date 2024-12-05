import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/item_data": {
        target: "http://localhost:8000/item_data",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/item_data/, ""),
      },
    },
  },
});
