// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

module.exports = mergeConfig(defaultConfig, {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    // keep ALL default assets, just remove svg from assets...
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    // ...and add svg to sources so SVGR can transform it
    sourceExts: [...sourceExts, 'svg'],
  },
});
