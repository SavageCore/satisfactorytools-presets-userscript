import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';
import { version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://savagecore.uk/img/userscript_icon.png',
        namespace: 'savagecore.uk',
        match: [
          '',
        ],
        "run-at": "document-idle",
        version,
        license: 'Unlicense',
        author: 'SavageCore',
        description: 'A template for userscripts',
        updateURL: 'https://github.com/SavageCore/userscript-template/releases/latest/download/userscript-template.meta.js',
        downloadURL: 'https://github.com/SavageCore/userscript-template/releases/latest/download/userscript-template.user.js',
        supportURL: 'https://github.com/SavageCore/userscript-template/issues',
        homepageURL: 'https://github.com/SavageCore/userscript-template',
      },
      build: {
        externalGlobals: {
          // jszip: cdn.unpkg('JSZip', 'dist/jszip.min.js'),
        },
        metaFileName: true,
      },
    }),
  ],
});
