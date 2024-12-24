// import { a } from './data';

// console.log(a)

import('./data').then(({ a }) => {
  console.log(a);
})