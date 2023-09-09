import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

const iconDirectory = resolve(__dirname, 'icons')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS({
      shortcuts: [
        { logo: 'i-logos-vue w-6em h-6em transform transition-800' },
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
      ],
    }),
  ],
})
