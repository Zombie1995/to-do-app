import svgr from "@svgr/rollup";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/to-do-app/",
  plugins: [react(), tsconfigPaths(), svgr()],
  optimizeDeps: {
    include: ["reflect-metadata"],
  },
});
