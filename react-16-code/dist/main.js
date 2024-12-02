/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/react/createElement.js
// const element = React.createElement('h1', { title: 'foo' }, '你好');

const createElement = function (type, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  // console.log(children, 'children')
  const vNode = {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === "object" ? child : createTextElement(child))
    }
  };
  return vNode;
};
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
;// ./src/react/react-dom.js
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
const render = (element, container) => {
  // 将根节点设置为第一个工作单元
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  };
};

/**
 * 创建 DOM
 * @param {*} fiber 节点
 * @returns dom 真实节点
 */
const createDom = fiber => {
  const dom = fiber.type === "TEXT_ELEMENT" ? document.createTextNode('') : document.createElement(fiber.type);
  const isProperty = key => key !== 'children'; // 过滤掉 children，挨个赋值 props
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
};

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
  // requestIdleCallback(workLoop);
}

// 执行单元事件，返回下一个单元事件
function performUnitOfWork(fiber) {
  console.log("fiber: " + fiber);
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  const elements = fiber.props.children;

  // 索引 index
  let index = 0;
  // 前一个兄弟节点
  let prevSibling = null;

  // 深度优先遍历
  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: elements.type,
      props: element.props,
      parent: fiber,
      dom: null
    };
    if (index === 0) {
      // 将第一个孩子节点设置为 fiber 的子节点
      fiber.child = newFiber;
    } else if (element) {
      // 将第一个节点之外的节点设置为第一个节点的兄弟节点
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    console.log("Fiber " + nextFiber);
    nextFiber = nextFiber.parent;
  }
}

// 在浏览器空闲时间执行
requestIdleCallback(workLoop);
;// ./src/react/index.js


const React = {
  createElement: createElement,
  render: render
};
/* harmony default export */ const react = (React);
;// ./src/index.js
// import React from 'react';

const src_element = /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("h1", {
  title: "foo"
}, "\u4F60\u597D", /*#__PURE__*/react.createElement("a", null, "ss")), /*#__PURE__*/react.createElement("a", {
  href: ""
}, "\u6D4B\u8BD5\u94FE\u63A5"));

// const node = document.createElement(element.type);
// node['title'] = element.props.title;

// const text = document.createTextNode('');
// text.nodeValue = element.props.children;

// node.appendChild(text);

const container = document.querySelector('#root');
// container.appendChild(node);

console.log('element:', src_element);
react.render(src_element, container);
/******/ })()
;