import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'process.env': {},
    },
    plugins: [
      {
        name: 'build-html',
        transformIndexHtml: (html) => {
          return {
            html,
            tags: [
              {
                tag: 'script',
                children: `
                  window.metabaseConfig = {
                    theme: { preset: 'light' },
                    isGuest: true,
                    instanceUrl: 'https://metabase-route-b4cd74-dev.apps.silver.devops.gov.bc.ca'
                  };
                `,
                injectTo: 'head-prepend',
              },
              {
                tag: 'script',
                attrs: {
                  src: 'https://metabase-route-b4cd74-dev.apps.silver.devops.gov.bc.ca/app/embed.js',
                  defer: true,
                },
                injectTo: 'head',
              },
              {
                tag: 'script',
                attrs: {
                  src: '/env.js',
                },
                injectTo: 'head',
              },
            ],
          }
        },
      },
      react()
    ],
    server: {
      fs: {
        allow: ['..'],
      },
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
        },
      },
      watch: {
        ignored: ['**/coverage/**', '**/playwright-report/**'],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    }
  }
})