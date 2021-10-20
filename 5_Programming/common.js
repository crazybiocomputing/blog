/**
 * Utilities
 * Jean-Christophe Taveau
 * 2021/10/20
 */

// Function range(..) equivalent to the Python range(..)
const range = (start,stop,step=1) => Array.from( {length: Math.floor((stop - start)/step)},(_,i) => start + i*step);
