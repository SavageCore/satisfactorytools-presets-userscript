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
          'https://www.satisfactorytools.com/1.0/production',
        ],
        "run-at": "document-idle",
        version,
        license: 'Unlicense',
        author: 'SavageCore',
        description: 'A template for userscripts',
        updateURL: 'https://github.com/SavageCore/satisfactorytools-helper/releases/latest/download/satisfactorytools-helper.meta.js',
        downloadURL: 'https://github.com/SavageCore/satisfactorytools-helper/releases/latest/download/satisfactorytools-helper.user.js',
        supportURL: 'https://github.com/SavageCore/satisfactorytools-helper/issues',
        homepageURL: 'https://github.com/SavageCore/satisfactorytools-helper',
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
