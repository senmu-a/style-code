// import React from 'react';
import React from './react';
const element = (
  <div>
    <h1 title="foo">你好<a>ss</a></h1>
    <a href="">测试链接</a>
  </div>
);

// const node = document.createElement(element.type);
// node['title'] = element.props.title;

// const text = document.createTextNode('');
// text.nodeValue = element.props.children;

// node.appendChild(text);

const container = document.querySelector('#root');
// container.appendChild(node);

console.log('element:', element);

React.render(element, container);
