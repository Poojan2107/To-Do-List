import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import detect from 'detect-port';

export default async () => {
  const DEFAULT_PORT = 5173;
  const port = await detect(DEFAULT_PORT);
  return defineConfig({
    plugins: [react()],
    server: {
      port,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true
        }
      }
    }
  });
};
