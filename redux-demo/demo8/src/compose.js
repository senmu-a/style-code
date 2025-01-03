export default function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }

  // return funcs.reduce(
  //   (a, b) =>
  //     (...args) =>
  //       a(b(...args))
  // );

  // return funcs.reduce((acc, cur) => {
  //   return (...args) => {
  //     console.log('args', args);
  //     console.log(acc, 'acc');
  //     return acc(cur(...args));
  //   }
  // });
  return (...args) => {
    // args 就是 dispatch
    let result = funcs[funcs.length - 1](...args);
    for (let i = funcs.length - 2; i >= 0; i--) {
      result = funcs[i](result);
    }
    return result;
  };
}