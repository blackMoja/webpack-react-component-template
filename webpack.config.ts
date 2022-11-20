import { ProvidePlugin } from 'webpack';
import path from 'path';
import packageJson from './package.json';
import type { Configuration } from 'webpack';

const resolve = (_path: string) => path.resolve(__dirname, _path);

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    path: resolve('../dist'),
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
    modules: [resolve('../src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.css'],
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
  ],
};

export default config;
