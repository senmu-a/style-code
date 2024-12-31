'use strict';
const loaderUtils = require('loader-utils');
const acorn = require('acorn');
const walk = require('acorn-walk');
const MagicString = require('magic-string');
module.exports = function (context) {
  console.log('前置钩子', this.data.value);
  const options = loaderUtils.getOptions(this);
  console.log('options配置文件: ', options);
  const ast = acorn.parse(context);
  console.log('ast: ', ast);
  const code = new MagicString(context);
  walk.simple(ast, {
    VariableDeclaration(node) {
      console.log('node🚀: ', node);
      const { start } = node;
      //const
      code.overwrite(start, start + node.kind.length, 'var');
    },
  });
  return code.toString();
};

module.exports.pitch = function (r, prerequest, data) {
  data.value = '京程一灯';
};
