const path = require('path');
 
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'main.bundle.js',
  },
  devtool: 'inline-source-map',
};



