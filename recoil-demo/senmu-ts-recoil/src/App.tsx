import React from 'react';
import logo from './logo.svg';
import './App.css';

import { atom, selector, useRecoilValue, useRecoilState } from './recoil'

const textState = atom({
  key: 'textState',
  default: 'senmu'
});

const charCountState = selector({
  key: 'charCountState',
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});

function App() {
  const [text, setText] = useRecoilState(textState);

  // 只是为了获取到 charCountState.snap();
  const count = useRecoilValue(charCountState);

  console.log('🍎触发 re-render')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>内容：{ text }</p>
        <p>长度：{ count }</p>
        <p>
          <input type="text" value={text} onChange={onChange} />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
