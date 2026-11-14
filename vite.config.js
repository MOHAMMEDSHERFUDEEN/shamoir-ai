
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],

  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          maxSize: 350_000,
          groups: [
            {
              name: 'three-core',
              test: /node_modules[\\/]three[\\/]/,
              priority: 30,
            },
            {
              name: 'three-stdlib',
              test: /node_modules[\\/]three-stdlib[\\/]/,
              priority: 25,
            },
            {
              name: 'react-three',
              test: /node_modules[\\/]@react-three[\\/]/,
              priority: 20,
            },
            {
              name: 'vendor',
              test: /node_modules[\\/]/,
              priority: 0,
            },
          ],
        },
      },
    },
  },
})
