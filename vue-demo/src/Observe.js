function defineReactive(vm, key, val) {
  const dep = new Dep(); // 初始化 Dep 依赖收集过程

  Object.defineProperty(vm, key, {
    get: function() {
      // 1. 收集依赖
      // 2. 返回数据
      if (Dep.target) {
        dep.addSub(Dep.target);
      }

      return val;
    },
    set: function(newVal) {
      if (val === newVal) return;
      val = newVal;
      dep.notify();
    }
  })
}

function observe(obj, vm) {
  Object.keys(obj).forEach(function (key) {
    defineReactive(vm, key, obj[key]);
  })
}
