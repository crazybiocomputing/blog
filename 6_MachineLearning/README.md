# 6- Machine Learning

[Table of Contents](https://crazybiocomputing.blogspot.com/2018/10/machine-learning-toc.html)

## 6.1. Install

### Install the JavaScript source files

- In your folder `ImageJ/plugins`, create a sub-folder entitled `crazybio` and a sub-sub-folder `ML`.
- Copy the various scripts and paste them in `ImageJ/plugins/crazybio/ML`.
- For testing the sources, create a folder `MyScripts` in `ImageJ/plugins` and create a new file with the extension `.js` and start writing your own code.

### JavaScript version

All the codes are written in a "modern" JavaScript version termed "JS2015+" or "JS ECMAScript". However, this version was partially implemented in the JDK (Java Development Kit) version 10 and 11 with a JS engine called "Nashorn". This engine was deprecated in the JDK version > 12, unfortunately...

Thus, to run these JavaScript files, you need to install and run ImageJ with a JVM (_Java Virtual Machine_) version 10 or 11.

## 6.2. Using the ML programs

At the beginning of your script, add the following lines to import the various source files

```javascript
/**
 * <Add a Title>
 * <Add your name>
 * <Add the date>
 */
 
'use strict';
 
////////////// IMPORTS //////////////

// Import nashorn polyfill and various ML programs
const IJ_PLUGINS = IJ.getDir('plugins');
load(`${IJ_PLUGINS}/crazybio/nashorn_polyfill.js`);
load(`${IJ_PLUGINS}/crazybio/ML/common.js`);
load(`${IJ_PLUGINS}/crazybio/ML/knn.js`);
```

## 6.3. Dataset

### CSV

[Measurements](https://gist.github.com/jeesay/35adc13ca8ae658d25a43b342334eee4)

### Labels

Each shape is labeled according to its sides number as follows:
- 0: circle
- 3: triangle
- 4: square

These labels are stored in the CSV file in the last column entitled `Vertices`.
