/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Puedes especificar el puerto si tienes algún conflicto
    open: true,  // Abre automáticamente el navegador cuando inicies el servidor
  },
  resolve: {
    alias: {
      '@': '/src',  // Alias para la carpeta src, útil si quieres importar componentes o archivos más fácilmente
    },
  },
})

