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
// 根节点
let wipRoot = null;
let currentRoot = null;
// 所有需要删除的节点
let deletions = null;
const isEvent = (key) => key.startsWith("on");
const isProperty = (key) => key !== 'children' && !isEvent(key);
// 是否新属性
const isNew = (prev, next) => (key) => prev[key] !== next[key];
// 是否老属性
const isGone = (prev, next) => (key) => !(key in next);

export const render = (element, container) => {
  // 将根节点设置为第一个工作单元
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  }
  deletions = [];
  nextUnitOfWork = wipRoot;
}

/**
 * 创建 DOM
 * @param {*} fiber 节点
 * @returns dom 真实节点
 */
export const createDom = (fiber) => {
  const dom = fiber.type === "TEXT_ELEMENT" ? document.createTextNode('') : document.createElement(fiber.type);
  updateDom(dom, {}, fiber.props);
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
 * 更新 DOM
 * @param {*} dom 
 * @param {*} prevProps 老属性
 * @param {*} nextProps 新属性
 */
function updateDom(dom, prevProps, nextProps) {
  // const isProperty = (key) => key !== 'children'; // 过滤掉 children，挨个赋值 props
  // Object.keys(fiber.props).filter(isProperty).forEach(key => {
  //   dom[key] = fiber.props[key];
  // });

  // 移除老的事件监听
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    })
  
  // 移除老的属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = '';
    });
  
  // 设置新的属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name];
    });
  
  // 添加新的事件监听
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, prevProps[name]);
    })
}

/**
 * 处理提交的 fiber 树
 * @param {*} fiber 
 */
function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  const domParent = fiber.parent.dom;

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'DELETEION') {
    domParent.removeChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  }

  // 递归
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

/**
 * 提交任务，将 fiber tree 渲染为真实 DOM
 */
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot
  wipRoot = null;
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
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

/**
 * 协调
 * @param {*} wipFiber 
 * @param {*} elements 
 */
function reconcileChildren(wipFiber, elements) {
  // 索引 index
  let index = 0;
  // 前一个兄弟节点
  let prevSibling = null;
  // 上一次渲染的fiber
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
 
   // 深度优先遍历
  while(index < elements.length || oldFiber) {
    const element = elements[index];

    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    // 类型相同更新
    if (sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      };
    }

    // 新的存在并且类型和老的不同，需要新增
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      };
    }

    // 老的存在并且类型和新的不同，需要删除
    if (oldFiber && !sameType) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    // 处理老fiber的兄弟节点
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      // 将第一个孩子节点设置为 fiber 的子节点
      wipFiber.child = newFiber;
    } else if (element) {
      // 将第一个节点之外的节点设置为第一个节点的兄弟节点
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}

/**
 * 执行单元事件，返回下一个单元事件
 * @param {*} fiber 
 * @returns 
 */
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  const elements = fiber.props.children;

  reconcileChildren(fiber, elements);

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while(nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    nextFiber = nextFiber.parent;
  }
 
}

// 在浏览器空闲时间执行
requestIdleCallback(workLoop);