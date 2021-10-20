
'use strict';

// Loop while



// Loop for
for (let i = 0; i < 10; i++) {
  j = i + 2;
  console.log(j);
}

// map(..)
let arr=[0,1,2,3,4,5,6,7,8,9];
let output = arr.map( v => v + 2);
console.log(output);

const range(start,stop,step=1) => {
  return Array.from( {length: Math.floor((stop - start)/step)},(_,i) => start + i*step);
  
console.log(range(0,10).map(v => v + 2));
