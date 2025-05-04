import { useState } from 'react';
// import LeakyCounter from './components/demo1/index.jsx';
// import LeakyWindowSize from './components/demo2/index.jsx';
// import LeakyChatMessages from './components/demo3/index.jsx';
// import LeakyCacheUserComponent from './components/demo5/index.jsx';
// import LeakyAnimationComponent from './components/demo6/index.jsx';
// import LeakyWorkerComponent from './components/demo7/index.jsx';

import './App.css';

function App() {
  const [show, setShow] = useState(true);
  return (
    <>
      {/* <h1>Memory Leak Demo1</h1> */}
      {/* <p>Check the console for memory leak demonstration.</p> */}
      <button onClick={() => setShow(!show)}>change Counter</button>
      {/* {show && <LeakyCounter />} */}
      <hr />
      {/* <h1>Memory Leak Demo2</h1> */}
      {/* {show && <LeakyWindowSize />} */}
      <hr />
      {/* <h1>Memory Leak Demo3</h1> */}
      {/* {show && <LeakyChatMessages />} */}
      <hr />
      {/* <h1>Memory Leak Demo5</h1> */}
      {/* <p>Check the console for memory leak demonstration.</p> */}
      {/* {show && <LeakyCacheUserComponent componentData={{ id: Math.random(), name: 'senmu' }} />} */}
      <hr />
      {/* <h1>Memory Leak Demo6</h1> */}
      {/* <p>Check the console for memory leak demonstration.</p> */}
      {/* {show && <LeakyAnimationComponent />} */}
      <hr />
      <h1>Memory Leak Demo7</h1>
      <p>Check the console for memory leak demonstration.</p>
      {/* {show && <LeakyWorkerComponent componentId={Math.random()} />} */}
    </>
  )
}

export default App
