const { override } = require('customize-cra');
const path = require('path');

module.exports = override(
  (config, env) => {
    config.devtool = env === 'development' ? 'source-map' : false;
    config.optimization.minimize = env === 'production';
    config.entry = {
      main: config.entry,
      contentScript: path.resolve(__dirname, 'src/contentScript.ts'),
      background: path.resolve(__dirname, 'src/background.ts')
    };

    config.output = {
      ...config.output,
      filename: (pathData) => {
        if (pathData.chunk.name === 'contentScript') {
          return 'contentScript.js';
        } else if (pathData.chunk.name === 'background') {
          return 'background.js';
        }
        return 'static/js/[name].[contenthash:8].js';
      },
    };

    return config;
  }
);
