module.exports = {
  // entry: {
  //   app: './src/index.js',
  //   app2: './src/index2.js'
  // },
  optimization: {
    runtimeChunk: { // 拆分 webpack 的 runtime
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all'
    }
  }
}