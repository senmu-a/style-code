class MyExamplePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('MyExamplePlugin', (stats) => {
      console.log('MyExamplePlugin: Compilation is done!');
      // You can access the stats object to get information about the build
      console.log('Build info:', stats.toJson());
    });
  }
};

module.exports = MyExamplePlugin;