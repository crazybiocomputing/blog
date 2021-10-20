/**
 * Utilities
 * Jean-Christophe Taveau
 * 2021/10/20
 */

/*
 * Adding some console functions
 */
const console = {};

console._log = function (symbol,args) {
  const sep = ' ';
  let msg = symbol;
  for (let i=0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      msg += JSON.stringify(args[i]) + sep;
    }
    else {
      msg += args[i].toString() + sep;
    }
  }
  IJ.log(msg);
}
/*
 * 
 */
console.assert = function() {
  if (!arguments[0]) {
    let args = [];
    for (let i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    console._log('Assertion failed: ',args);
  }
}

/*
 * console.debug
 */
console.debug = function()  {
  console._log('',arguments);
}

/*
 * console.log
 */
console.log = function () {
  console._log('',arguments);
};


/*
 * console.warn
 */
console.warn = function()  {
  console._log('⚠ ',arguments);
}

/*
 * console.error
 */
console.error = function()  {
  console._log('⚠ ',arguments);
}

/*
 * console.info
 */
console.info = function() {
  console._log('ⓘ ',arguments);
}

/*
 * Conversion of Java Array to JS Array
 */
const toArrayJS = (java_array) => Java.from(java_array);


// Function range(..) equivalent to the Python range(..)
const range = (start,stop,step=1) => Array.from( {length: Math.floor((stop - start)/step)},(_,i) => start + i*step);
