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
 * 
 */
console.debug = function()  {
  console._log('',arguments);
}

/*
 * 
 */
console.log = function () {
  console._log('',arguments);
};


/*
 * 
 */
console.warn = function()  {
  console._log('⚠ ',arguments);
}

/*
 * 
 */
console.error = function()  {
  console._log('⚠ ',arguments);
}

/*
 * 
 */
console.info = function() {
  console._log('ⓘ ',arguments);
}

/*
 * 
 */
const toArrayJS = (java_array) => Java.from(java_array);
