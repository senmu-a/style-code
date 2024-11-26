/******/ (() => { // webpackBootstrap
// import React from 'react';
const element = /*#__PURE__*/React.createElement("h1", {
  title: "foo"
}, "\u4F60\u597D", /*#__PURE__*/React.createElement("a", null, "hello"));
const node = document.createElement(element.type);
node['title'] = element.props.title;
const text = document.createTextNode('');
text.nodeValue = element.props.children;
node.appendChild(text);
const container = document.querySelector('#root');
container.appendChild(node);
console.log('element:', element);
/******/ })()
;