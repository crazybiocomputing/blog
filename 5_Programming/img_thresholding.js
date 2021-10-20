/*
 * Implementing threshold
 * Jean-Christophe Taveau
 * 2017-10-24 updated 2021/10/20
 */

'use strict';

// Import
const IJ_PLUGINS = IJ.getDir('plugins');
load(`${IJ_PLUGINS}/crazybio/nashorn_polyfill.js`);
load(`${IJ_PLUGINS}/crazybio/utils.js`);


// First version
function threshold(imp,value) {
  let ip = imp.getProcessor();
  let len = imp.getWidth() * imp.getHeight();
  for (let i= 0; i < len; i++) {
    if (ip.get(i) > value) {
      ip.set(i,255);
    }
    else {
      ip.set(i,0);
    }
  }
}

// Second version with map(..) and range(..)
const thrshld = (imp,value) => {
  let ip = imp.getProcessor();
  let len = imp.getWidth() * imp.getHeight();
  range(0,len).forEach( i => {
    let outpx = (ip.get(i) > value) ? 255 : 0;
    ip.set(i, outpx) );
  }
}

// Main
const imp = IJ.getImage();
// Second version
thrshld(imp,128);
// Force Update display
imp.updateAndDraw();
