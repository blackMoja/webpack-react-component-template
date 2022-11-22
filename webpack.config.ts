import { ProvidePlugin } from 'webpack';
import path from 'path';
import CopyPkgJson from 'copy-pkg-json-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import packageJson from './package.json';
import { packageProduction } from './package.production';
import type { Configuration } from 'webpack';

const resolve = (_path: string) => path.resolve(__dirname, _path);

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    path: resolve('./dist'),
    filename: 'index.js',
    umdNamedDefine: true,
    library: {
      name: packageJson.name,
      type: 'umd',
    },
    clean: true,
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
    },
  },
  resolve: {
    modules: [resolve('./src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.css'],
    alias: {
      '@/*': resolve('./src'),
      '@@/*': resolve('./'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
  plugins: [
    new ProvidePlugin({
      React: 'react',
    }),
    new CopyPkgJson({
      new: packageProduction,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('./src/style/index.css'),
          to: resolve('./dist/index.css'),
          toType: 'file',
        },
      ],
    }),
  ],
};

export default config;
