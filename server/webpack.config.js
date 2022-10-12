const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './index.js',
  output: {
  filename: 'glutencero.js',
  path: path.join(__dirname, 'dist'),
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [nodeExternals()],
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
      },
};
