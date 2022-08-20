const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('precss'),
    require('postcss-css-variables'),
    require('postcss-custom-media'),
    require('postcss-media-minmax'),
    require('postcss-extend-rule'),
    postcssPresetEnv({
      stage: 0,
    }),
    require('postcss-color-mix'),
    require('cssnano'),
    require('autoprefixer'),
    require('postcss-nested')
  ],
};