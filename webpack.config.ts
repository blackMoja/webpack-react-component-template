import { resolve } from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { loader } from 'mini-css-extract-plugin';

import type { Configuration } from 'webpack';

const config: Configuration = {
  entry: './src/index.ts',
  name: 'SgDesignSystem',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    modules: [resolve('../src'), 'node_modules'],
    alias: {
      '@': resolve('../src'),
      '@@/*': resolve('../'),
    },
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(jsx|js|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/i,
        use: [loader, { loader: 'css-loader', options: { modules: true } }],
      },
    ],
  },
};

export default config;
