var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./webpack.config.base');

config.entry = {
  index: [
    // 'babel-polyfill',
    'webpack-dev-server/client?http://127.0.0.1:3000',
    'webpack/hot/only-dev-server',
    './src/index.tsx'
  ]
};

config.plugins.push(new ExtractTextPlugin('stylesheet/[name].css', {
  allChunks: true
}));
config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'vendors'
}));
config.module.loaders.push({
  test: /\.tsx?$/, use: 'awesome-typescript-loader'
})
config.module.loaders.push({
  enforce: "pre", test: /\.js$/, loader: 'source-map-loader'
})
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("development")
  },
  __DEBUG__: true
}));

config.devtool = 'source-map';

for (var key in config.entry) {
  if (key == 'vendors') {
    continue;
  }
  config.plugins.push(new HtmlWebpackPlugin({
    template: './src/' + key + '.html',
    filename: key + '.html',
    chunks: ['vendors', key]
  }));
}

module.exports = config;


// module.exports = {

//   entry: {
//     index: [
//       'webpack-dev-server/client?http://127.0.0.1:3000',
//       'webpack/hot/only-dev-server',
//       './examples/index.js'
//     ],
//   },

//   output: {
//     path: path.join(process.cwd(), 'assets'),
//     filename: 'js/[name].min.js',
//     chunkFilename: 'js/[name].[chunkhash:8].min.js',
//     publicPath: '/'
//   },

//   module: {
//     loaders: [
//       { 
//         test: /\.(js|jsx)$/, 
//         loader: 'react-hot!babel',
//         exclude: /node_modules/
//       },
//       { 
//         test: /\.scss$/, 
//         loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&-minimize!autoprefixer!sass?sourceMap")
//       },
//       { 
//         test: /\.css$/, 
//         loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&-minimize!autoprefixer")
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif)$/,
//         loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
//       },
//       {
//         test: /\.(woff|woff2|ttf|eot|svg)$/,
//         loader: 'file-loader?name=fonts/[name].[ext]'
//       },
//       {
//         test: /\.(html)$/,
//         loader: 'file-loader?name=[name].[ext]'
//       }
//     ]
//   },

//   plugins: [
//     new ExtractTextPlugin('stylesheet/[name].css', {
//       allChunks: true
//     }),
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'vendors'
//     }),
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin(),
//     new webpack.DefinePlugin({
//       "process.env": {
//         NODE_ENV: JSON.stringify("development")
//       },
//       __DEBUG__: true
//     })
//   ],
  
//   resolve: {
//     extensions: ['', '.js', '.jsx']
//   },

//   devtool: 'source-map'
// };
