import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    server: {
        host: "::",
        port: 8080,
    },
    plugins: [
        react(),
                                           mode === 'development' && componentTagger(),
    ].filter(Boolean),

                                           resolve: {
                                               alias: {
                                                   "@": path.resolve(__dirname, "./src"),
                                               },
                                           },

                                           build: {
                                               outDir: "dist", // Vercel expects this (default is fine, but we declare it explicitly)
emptyOutDir: true,
                                           },
}));
