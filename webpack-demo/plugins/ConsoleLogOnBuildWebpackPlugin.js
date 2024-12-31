const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    console.log('---默认插件开始注册---');
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('--------------------------------', compilation);
      console.log(pluginName, 'The webpack build process is starting!!!');
    });
    compiler.hooks.done.tap('pluginName1', (compilation) => {
      // console.log('--------------------------------', compilation);
      console.log(pluginName, 'The webpack build process is end!!!!!');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;