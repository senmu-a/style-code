function deepClone(obj) {
  // 创建 WeakMap 用于存储已克隆的对象，防止循环引用
  const hash = new WeakMap();

  function _deepClone(_obj) {
    // 1. 判断 obj 是否存在，不存在直接返回
    // 2. 判断 obj 是否是基本类型，是的话直接返回
    // 3. 判断 obj 是否是其他引用类型，例如：正则、日期对象、Promise 对象、Map、Set
    // 4. 判断 obj 是否是数组，是的话进行遍历，然后递归调用 deepClone
    // 5. 判断 obj 是否是对象，是的话遍历对象，递归调用 deepClone
    if (_obj === null || typeof _obj !== 'object') return _obj;
    if (hash.has(_obj)) return hash.get(_obj);
    if (_obj instanceof Date) return new Date(_obj.getTime());
    if (_obj instanceof RegExp) return new RegExp(_obj.pattern, _obj.flags);
    if (_obj instanceof Promise) return Promise.resolve(_obj);
    if (_obj instanceof Date) return new Date(_obj.getTime());
    if (_obj instanceof RegExp) return new RegExp(_obj.pattern, _obj.flags);
    if (_obj instanceof Promise) return Promise.resolve(_obj);
    if (_obj instanceof Map) {
      const map = new Map();
      hash.set(_obj, map);
      _obj.forEach((value, key) => {
        map.set(key, _deepClone(value));
      });
      return map;
    }
    if (_obj instanceof Set) {
      const set = new Set();
      hash.set(_obj, set);
      _obj.forEach(value => {
        set.add(_deepClone(value));
      });
      return set;
    }
    if (Array.isArray(_obj)) {
      const arr = [];
      hash.set(_obj, arr);
      return _obj.forEach((item, index) => {
        arr[index] = _deepClone(item);
      });
    }
    if (Object.prototype.toString.call(_obj) === '[object Object]') {
      const result = {};
      hash.set(_obj, result);
      for (const key in _obj) {
        if (_obj.hasOwnProperty(key)) {
          result[key] = _deepClone(_obj[key]);
        }
      }
      return result;
    }
  }
  
  return _deepClone(obj);;
}