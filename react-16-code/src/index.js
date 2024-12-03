// import React from 'react';
// import React from './react';
// const element = (
//   <div>
//     <h1 title="foo">你好<a>ss</a></h1>
//     <a href="">测试链接</a>
//   </div>
// );

// const node = document.createElement(element.type);
// node['title'] = element.props.title;

// const text = document.createTextNode('');
// text.nodeValue = element.props.children;

// node.appendChild(text);

// const container = document.querySelector('#root');
// container.appendChild(node);

// console.log('element:', element);

// React.render(element, container);

import React from './react';

const container = document.querySelector('#root');

// const updateValue = (e) => {
//   console.log('update', e);
//   rerender(e.target.value);
// }

// const rerender = (value) => {
//   const element = (
//     <div>
//       <input onInput={updateValue} value={value} />
//       <h2>Hello {value}</h2>
//     </div>
//   );
//   React.render(element, container);
// }

// rerender('world');

function App() {
  return (
    <h1>Hello World!</h1>
  )
}

const element = <App />;

console.log(element, 'ele')

React.render(element, container);