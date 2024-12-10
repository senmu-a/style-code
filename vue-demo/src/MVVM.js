function Vue(options) {
  this.data = options.data; // 将数据挂载到实例上
  
  var data = this.data;

  observe(data, this); // 监听数据 get、set（没有触发）
  
  var id = options.el; // app

  // 模板

  /**
   * <input type="text" id="a" v-model="text" />
   * {{text}}
   */
  var dom = new Compile(document.getElementById(id), this);
  // redner

  document.getElementById(id).appendChild(dom);
}