/*
 * Adding some console functions
 * Jean-Christophe Taveau
 * 2021/11/08
 */
const console = {};

/*
 * 
 */
console.clear = function()  {
  IJ.log('\\Clear');
}

console._log = function (symbol,args) {
  const sep = ' ';
  let msg = symbol;
  for (let i=0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      let txt = JSON.stringify(args[i]);
      msg += (txt !== undefined) ? txt + sep : args[i].toString() + sep;
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
const toJSArray = (java_array) => Java.from(java_array);

/*
 * Specific Nashorn code for IMAGEJ to Extend ImageWindow
 * 
 * 
 */
 
function setOverlay(renderer,root) {
  const ImageWindow = Java.type('ij.gui.ImageWindow');

  const WindowIJ = Java.extend(ImageWindow);
  let imp = renderer.imp;
  let offscreen = renderer.offscreen;
  let listeners = root.listeners;

  let myWin = new WindowIJ(imp) {
    /*
     * Override mouseMoved(x,y)
     */
    mouseMoved: function(x,y) {
      // Private function
      const triggerTarget = (event_type,id) => {
        let target = listeners[event_type].filter( elt => elt.node.ID === id)[0];
        if (target !== undefined) {
          // Trigger the action `event_type`
          target.callback(target.node);
          // Update drawing
          target.node.draw(renderer);
        }
        return target;
      };
      
      ///////////// MAIN /////////////
      let self = Java.super(myWin);
      let imp = self.getImagePlus();
      
      // Step #1 - Hovering
      let hoverID = offscreen.getProcessor().getf(x,y);
      let target = triggerTarget('mouseover', hoverID);
      if (listeners.activeNode !== undefined && target !== undefined && target.node.ID !== listeners.activeNode.ID ) {
        triggerTarget('mouseout',listeners.activeNode.ID);
      }
      if (listeners.activeNode !== undefined && target === undefined ) {
        triggerTarget('mouseout',listeners.activeNode.ID);
      }
      listeners.activeNode = (target === undefined) ? undefined : target.node;

      // Step #2 - Overlay for (tooltip,etc.)
      let overlay = new Overlay();
      // Draw guides
      overlay.add(new Line(x,0,x,imp.getHeight()));
      overlay.add(new Line(0,y,imp.getWidth(),y));
      // Draw tooltip
      let tw = 100.0;
      let th = 50.0;
      let margin = 10.0;
      let xx = [x,x + margin ,x+ margin,x+tw    ,x+tw    ,x+margin,x+margin];
      let yy = [y,y - margin ,y-th/2.0 ,y-th/2.0,y+th/2.0,y+th/2.0,y+margin];
      // Background...
      let tooltip = new PolygonRoi(new FloatPolygon(xx,yy),Roi.POLYGON);
      tooltip.setFillColor(new java.awt.Color(0,0,0)); // Black
      // Border...
      let border = new PolygonRoi(new FloatPolygon(xx,yy),Roi.POLYGON);
      border.setStrokeWidth(1.0); // Black
      border.setStrokeColor(Color.yellow); // Black
      // Label...
      let font = new java.awt.Font("SansSerif", Font.PLAIN, 12);
      let text = new TextRoi(x+ margin + 10.0, y-22.0, `x= ${x}\ny= ${y}\nID= ${offscreen.getProcessor().getf(x,y)}`, font);
      text.setStrokeColor(Color.white); // Yellow
      
      // Add everything in overlay and display
      overlay.add(tooltip);
      overlay.add(border);
      overlay.add(text);

      imp.setOverlay(overlay);
      // imp.setOverlay(roi, Color.yellow, 1, new Color(0,0,1.0,0.4));
      //IJ.log('Coords ' + x + ' ' + y + ' ' + imp.getWidth() ); //  + this.getImagePlus());

    }
  };
  // Set extended ImageWindow...
  imp.setWindow(myWin);

}
