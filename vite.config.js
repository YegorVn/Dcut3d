import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/Dcut3d/",
  root: ".", // Указываем корневую директорию проекта
  build: {
    outDir: "dist", // Папка для сборки
    emptyOutDir: true, // Очищать папку dist перед сборкой
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Псевдоним для папки src
    },
  },
  publicDir: "public", // Папка с статикой
});
