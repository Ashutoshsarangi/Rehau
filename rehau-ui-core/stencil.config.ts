import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import alias from 'rollup-plugin-alias';

export const config: Config = {
  namespace: 'rehau-ui-core',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: require('path').resolve('./src/assets/fonts'),
          dest: require('path').resolve('./dist/assets/fonts')
        },
      ]
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ],
  globalStyle: 'src/styles/_styles-global.scss',
  plugins: [
    sass({
      injectGlobalPaths: ['src/styles/_styles-injected.scss']
    }),
    postcss({
      plugins: [autoprefixer()]
    }),
    alias({
      'resolve': ['.jsx', '.js', '.tsx', '.ts'],
      // ROLLUP ALIAS SUPPORT ONLY THE ALIASES FOR FILES (NOT FOR FOLDERS)
      '@env': 'src/envs/env.ts'
    })
  ]
};
