// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

import { fromRollup } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';

import rollupNodePolyfills from 'rollup-plugin-polyfill-node';


const commonjs = fromRollup(rollupCommonjs);
const nodePolyfills = fromRollup(rollupNodePolyfills);

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: false,
  /** Use regular watch mode if HMR is not enabled. */
  watch: !hmr,
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: 'demo/index.html',

  plugins: [
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.litElement] }),
    commonjs(),
    nodePolyfills()
    //commonjs({
    //  include: [
    //    '../../**/node_modules/moment/**/*',
    //  ],
    // }),
    // importMapsPlugin(),
  ],

  // See documentation for all available options
});
