import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    allowedHosts: ["2ba07ad9d8f4bae1de1d7a1dd0c6282e.serveo.net"],
  },
});
