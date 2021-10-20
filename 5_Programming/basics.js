/*
 2017-09-12
 Jean-Christophe Taveau
 
 Basics of JS Programming
*/

// Display Hello World
IJ.log('Hello World');
IJ.log(3.14); // PI number

/**** TD #1: Variables ****/
let i; // step : declaration
i = 12; // step: init
let this_is_a_variable = 1;
let var0 = 23;

// used as iterators in loops:
// i j k l m n p 
let width = 100;
let height = 200;
let widthOfImage = 200;
let width_of_image = 300;

// JavaScript 5.0
// ECMAScript 2015 or 6
// let foo = 123;
// const PI = 3.14;

let fooz = 234;
let baz;
fooz = 567;
baz = fooz + 1;

// Op: + * / - %
let myCos = Math.cos(0.0);
IJ.log(myCos);
IJ.log(baz);

// Swap
fooz = 10;
baz = 20;
let tmp;
tmp = fooz;
fooz = baz;
baz = tmp;
