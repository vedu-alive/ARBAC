import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    alias: {
      '@': "/src",
    },
  },
  plugins: [react(),viteTsconfigPaths(),svgr({
    include: "**/*.svg",
  }),],
})