const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
  ],
  entry: './src/client.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /public/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env", "react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'http://localhost:8050/public/assets'
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), "node_modules"],
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8050/public/assets'
  },
  devServer: {
  	headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'public'),
    port: 8050
  }
};