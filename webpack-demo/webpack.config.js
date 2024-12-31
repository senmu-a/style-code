// const { resolve } = require('path');
// const ConsoleLogOnBuildWebpackPlugin = require('./plugins/ConsoleLogOnBuildWebpackPlugin');

// module.exports = {
//   // entry: (item) => {
//   //   console.log(item, 'item')
//   //   if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
//   //     const entrykey = RegExp.$1
//   //     _entry[entrykey] = item;
//   //     const [dist, template] = entrykey.split("-");
//   //   }
//   // },
//   plugins: [new ConsoleLogOnBuildWebpackPlugin()],
// };

const { resolve } = require('path');
const ConsoleLogOnBuildWebpackPlugin = require('./plugins/ConsoleLogOnBuildWebpackPlugin');
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: resolve('./loaders/babel-index.js'),
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
  plugins: [new ConsoleLogOnBuildWebpackPlugin()],
};
