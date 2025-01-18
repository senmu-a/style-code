import React, { useState } from 'react';
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

  const [data, setData] = useState()


  const fetchData = async () => {
    const result = await fetch('https://still-bonus-82ee.senmu98.workers.dev/data')
    // const result = await fetch('http://localhost:8787/data')
    return result.json();
  }

  const handleFetchData = async () => {
    const result = await fetchData();
    setData(result);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>内容：{ text }</p>
        <p>长度：{ count }</p>
        {data && <p>请求接口后的内容：<code>{ JSON.stringify(data, null, 2) }</code></p>}
        <p>
          <input type="text" value={text} onChange={onChange} />
        </p>
        <button className="App-link" onClick={handleFetchData}>
          请求接口
        </button>
      </header>
    </div>
  );
}

export default App;
