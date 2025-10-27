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
        description: 'A userscript to enhance Satisfactory Tools with Presets functionality.',
        updateURL: 'https://github.com/SavageCore/satisfactorytools-presets-userscript/releases/latest/download/satisfactorytools-presets-userscript.meta.js',
        downloadURL: 'https://github.com/SavageCore/satisfactorytools-presets-userscript/releases/latest/download/satisfactorytools-presets-userscript.user.js',
        supportURL: 'https://github.com/SavageCore/satisfactorytools-presets-userscript/issues',
        homepageURL: 'https://github.com/SavageCore/satisfactorytools-presets-userscript',
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
