/**
 * Exploring loops
 * Jean-Christophe Taveau
 * 2019/10/05
 */

'use strict';

// Import
const IJ_PLUGINS = IJ.getDir('plugins');
load(`${IJ_PLUGINS}/crazybio/nashorn_polyfill.js`);
load(`${IJ_PLUGINS}/crazybio/common.js`);

// Loop while
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}

// Loop do...while
let i = 0;
do { 
  console.log(i);
  i++;
}
while (i < 10);

// Loop for ★★★
for (let i = 0; i < 10; i++) {
  j = i + 2;
  console.log(j);
}

// Using function map(..)
let arr=[0,1,2,3,4,5,6,7,8,9];
let output = arr.map( v => v + 2);
console.log(output);

let output2 = range(0,10).map(v => v + 2) 
console.log(output2);
