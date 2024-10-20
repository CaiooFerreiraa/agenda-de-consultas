// Importações usando ES Modules
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';

export default {
  mode: 'development',
  entry: './frontend/main.js',
  output: {
    path: path.resolve('public', 'assets', 'js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Adicionando suporte para CSS
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devtool: 'source-map',
};
