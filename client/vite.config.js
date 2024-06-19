import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
//Esto
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/static/client/",
  build: {
    manifest: true,
    outDir: resolve("./dist"),
    emptyOutDir: true,
    rollupOptions: {
        input : resolve("./src/main.jsx"),
    }
  }
})
