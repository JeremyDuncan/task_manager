const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

// Add resolve for .jsx files
environment.loaders.append('jsx', {
  test: /\.jsx?$/,
  use: [
    {
      loader: 'babel-loader',
      options: environment.loaders.get('babel').use[0].options
    }
  ]
})

module.exports = environment
