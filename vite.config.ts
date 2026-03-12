import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // This repo is a GitHub Pages *user site* (username.github.io), served at /.
  base: "/",
});
