// const element = React.createElement('h1', { title: 'foo' }, '你好');

export const createElement = (type, props, ...children) => {
  console.log(children, 'children')
  const vNode = {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === "object" ? child : createTextElement(child))
    },
  };
  return vNode;
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  }
}