module.exports = function(source) {
  // 对 source 字符串进行反转
  const reversed = source.split('').reverse().join('');

  console.log("Reversed string:", reversed);

  console.log("Options:", this.getOptions());

  // 返回反转后的字符串
  return `module.exports = ${JSON.stringify(reversed)}`;
};