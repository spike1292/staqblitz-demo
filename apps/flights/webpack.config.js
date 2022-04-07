const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const reactConfig = require('@nrwl/react/plugins/webpack');
const mf = require('@angular-architects/module-federation/webpack');
const { merge } = require('webpack-merge');
const path = require('path');

/**
 * We use the NX_TSCONFIG_PATH environment variable when using the @nrwl/angular:webpack-browser
 * builder as it will generate a temporary tsconfig file which contains any required remappings of
 * shared libraries.
 * A remapping will occur when a library is buildable, as webpack needs to know the location of the
 * built files for the buildable library.
 * This NX_TSCONFIG_PATH environment variable is set by the @nrwl/angular:webpack-browser and it contains
 * the location of the generated temporary tsconfig file.
 */
const tsConfigPath =
  process.env.NX_TSCONFIG_PATH ??
  path.join(__dirname, '../../tsconfig.base.json');

const workspaceRootPath = path.join(__dirname, '../../');
const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  tsConfigPath,
  [
    /* mapped paths to share */
  ],
  workspaceRootPath
);

module.exports = (config) => {
  config = reactConfig(config);
  return merge(config, {
    output: {
      uniqueName: 'flights',
      publicPath: 'auto',
    },
    optimization: {
      runtimeChunk: false,
    },
    experiments: {
      outputModule: true,
    },
    target: 'es2020',
    resolve: {
      alias: {
        ...sharedMappings.getAliases(),
      },
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'flights',
        filename: 'remoteEntry.js',
        exposes: {
          './Module': 'apps/flights/src/app/app.tsx',
        },
        remotes: {
          dashboard: 'http://localhost:4202/remoteEntry.js',
        },
        library: {
          type: 'module',
        },
        shared: mf.share({
          react: {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            includeSecondaries: true,
          },
          'react-dom': {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            includeSecondaries: true,
          },
          rxjs: {
            singleton: true,
            strictVersion: true,
            requiredVersion: 'auto',
            includeSecondaries: true,
          },
          ...sharedMappings.getDescriptors(),
        }),
      }),
      sharedMappings.getPlugin(),
    ],
  });
};
