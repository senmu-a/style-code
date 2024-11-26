const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "你好"
  }
}

export const render = (element, container) => {
  const dom = element.type === "TEXT_ELEMENT" ? document.createTextNode('') : document.createElement(element.type);
  const isProperty = (key) => key !== 'children'; // 过滤掉 children，挨个赋值 props
  Object.keys(element.props).filter(isProperty).forEach(key => {
    dom[key] = element.props[key];
  });
  element.props.children.forEach(child => render(child, dom)); // 将每一个 children 都重新 render 一遍（递归 stack-reconcile）
  container.appendChild(dom);
}