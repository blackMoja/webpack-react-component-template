import { resolve } from 'path';
import type { Configuration } from 'webpack';

const config: Configuration = {
  entry: './src/index.ts',
  name: 'webpack-example',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      type: 'module',
    },
    clean: true,
  },
  resolve: {
    modules: [resolve('../src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  experiments: {
    outputModule: true,
  },
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
        loader: 'ts-loader',
        test: /\.(tsx|ts)$/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
};

export default config;
