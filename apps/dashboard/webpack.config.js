const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
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

module.exports = (config) =>
  merge(config, {
    output: {
      uniqueName: 'dashboard',
      publicPath: 'auto',
    },
    optimization: {
      runtimeChunk: false,
    },
    experiments: {
      outputModule: true,
    },
    resolve: {
      alias: {
        ...sharedMappings.getAliases(),
      },
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'dashboard',
        filename: 'remoteEntry.js',
        exposes: {
          './Module': 'apps/dashboard/src/app/app.element.ts',
          './Button': 'apps/dashboard/src/app/button.element.ts',
          './CurrentWeather': 'apps/dashboard/src/app/current-weather.element.ts',
        },
        library: {
          type: 'module',
        },
      }),
      sharedMappings.getPlugin(),
    ],
  });
