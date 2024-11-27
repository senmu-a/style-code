// const element = {
//   type: "h1",
//   props: {
//     title: "foo",
//     children: "你好"
//   }
// }

// 超级 fiber 的实现
// render（初始化 nextUnitOfWork） ——> requestIdleCallback ——> workLoop ——> nextUnitOfWork ——> performUnitOfWork

let nextUnitOfWork = null;

export const render = (element, container) => {
  // 将根节点设置为第一个工作单元
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  }
}

/**
 * 创建 DOM
 * @param {*} fiber 节点
 * @returns dom 真实节点
 */
export const createDom = (fiber) => {
  const dom = fiber.type === "TEXT_ELEMENT" ? document.createTextNode('') : document.createElement(element.type);
  const isProperty = (key) => key !== 'children'; // 过滤掉 children，挨个赋值 props
  Object.keys(fiber.props).filter(isProperty).forEach(key => {
    dom[key] = fiber.props[key];
  });
  return dom;
  // element.props.children.forEach(child => render(child, dom)); // 将每一个 children 都重新 render 一遍（递归 stack-reconcile）
  // container.appendChild(dom);

  // 为什么要换掉之前的不能中断的心智模型
  // 心智模型
  // while (下一个工作单元) {
  //   下一个工作单元 = 执行工作单元(下一个工作单元丢进去)
  // }
}

/**
 * 工作循环
 * @param {*} deadline 截止时间
 */
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    // 执行工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // 判断是否需要停止
    shouldYield = deadline.timeRemaining() < 1;
  }
}

// 执行单元事件，返回下一个单元事件
function performUnitOfWork(fiber) {
  
}

// 在浏览器空闲时间执行
requestIdleCallback(workLoop);