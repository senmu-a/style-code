const path = require("path");
const MyExamplePlugin = require("./MyExamplePlugin");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: [
          {
            loader: path.resolve(__dirname, "reverseStringLoader.js"),
            options: {
              reverse: true, // 反转字符串
            } // 传递给 loader 的选项
          }
        ]
      }
    ]
  },
  plugins: [new MyExamplePlugin()],
};