const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.blockList = [
  /node_modules\/.*\/node_modules\/react-native\/.*/,
]; // Avoid conflicts with nested react-native

module.exports = withNativeWind(config, { input: "./global.css" });
