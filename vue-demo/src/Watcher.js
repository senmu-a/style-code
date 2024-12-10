let uid = 0;

function Watcher(vm, node, name, type) {

  Dep.target = this; // watcher

  this.name = name; // 变量名称
  this.id = ++uid;
  this.node = node; // 节点
  this.vm = vm; // vue 实例
  this.type = type; // 节点上的属性

  this.update(); // render 渲染

  Dep.target = null;
}

Watcher.prototype = {
  update: function() {
    this.get();

    if (!batcher) {
      batcher = new Batcher();
    }
    batcher.push(this);

    this.node[this.type] = this.value;
  },
  cb: function() {
    console.log("dom update");
    this.node[this.type] = this.value;
  },
  get: function() {
    this.value = this.vm[this.name]; // get 触发拿到值，并且完成依赖收集
  }
}