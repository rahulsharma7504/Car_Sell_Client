const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // The name of the bundled output file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Use Babel to transpile JS files
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Load CSS files
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader'], // Handle image files
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve .js and .jsx extensions
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true, // Automatically open the browser
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use the public/index.html as template
    }),
  ],
  mode: 'development', // Set mode to 'development' or 'production'
};
