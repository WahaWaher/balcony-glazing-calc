const fs = require('fs');
const path = require('path');
const rewireAliases = require('react-app-rewire-aliases');
const removeWebpackPlugins = require('react-app-rewire-unplug');
// let { paths } = require('react-app-rewired');

const resolveApp = (relativePath) =>
  path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = {
  webpack: function (config, env) {
    // const isDev = env === 'development';
    const isProd = env === 'production';

    /**
     * Aliases
     */
    config = rewireAliases.aliasesOptions({
      '@': resolveApp(`src/`),
    })(config, env);

    /**
     * Source Maps
     */
    config.devtool = isProd ? 'none' : 'cheap-module-source-map';

    /**
     * Remove unnecessary plugins
     */
    config = removeWebpackPlugins(config, env, {
      pluginNames: isProd
        ? ['ManifestPlugin', 'MiniCssExtractPlugin', 'SourceMapDevToolPlugin']
        : ['ManifestPlugin'],
      verbose: true,
    });

    /**
     * Replace MiniCssExtractPlugin loaders with style-loader
     */
    if (isProd) {
      // eslint-disable-next-line array-callback-return
      config.module.rules[1].oneOf.map((x) => {
        if (/css|scss/.test(x.test))
          x.use[0] = resolveApp('node_modules/style-loader/dist/cjs.js');
      });
    }

    /**
     * Change output assets names
     */
    if (isProd) {
      config.output.filename = 'balconyGlazingCalc.min.js';
    }

    /**
     * Disable chunks
     */
    if (isProd) {
      config.optimization.splitChunks = false;
      config.optimization.runtimeChunk = false;
    }

    /**
     * Reconfigure HtmlWebpackPlugin
     */
    if (isProd) {
      const HtmlWebpackPlugin = config.plugins.find(
        (x) => x.constructor.name === 'HtmlWebpackPlugin'
      );

      HtmlWebpackPlugin.options.minify = false;
    }

    return config;
  },
  paths: function(paths, env) {
    /**
     * Change output dir
     */
    paths.appBuild = resolveApp('docs/');

    return paths;
  },
};
