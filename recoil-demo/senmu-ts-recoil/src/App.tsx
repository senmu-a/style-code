import React from 'react';
import logo from './logo.svg';
import './App.css';

import { atom, useRecoilValue, useRecoilState } from './recoil'

const textState = atom({
  key: 'textState',
  default: 'senmu'
});

function App() {
  const context = useRecoilValue(textState);
  const [text, setText] = useRecoilState(textState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{ context }</p>
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
