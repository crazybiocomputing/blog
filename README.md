# CrazyBiocomputing Blog

This repository contains all the JavaScript code I wrote in the blog [CrazyBioComputing](https://crazybiocomputing.blogspot.com).

1. Digital Image 
2. Processing
3. Analysis
4. 2.5D and 3D
5. Programming
6. Machine Learning

## Install

### Install the JavaScript source files

- In your folder `ImageJ/plugins`, create a sub-folder entitled `crazybio` 
- Copy and paste the two files `nashorn_polyfill.js` and `utils.js`
- For the code contained in each section of the blog, I advise you to create a sub-sub-folder. For example, `ImageJ/plugins/crazybio/ML` for Machine Learning. 
- For testing the sources, I suggest you to create another folder entitled `MyScripts` in `ImageJ/plugins` and create a new file with the extension `.js` for writing your own code.

### JavaScript version

All the codes are written in a "modern" JavaScript version termed "JS2015+" or "JS ECMAScript". However, this version was partially implemented in the JDK (Java Development Kit) version 10 and 11 with a JS engine called "Nashorn". This engine was deprecated in the JDK version > 12, unfortunately...

Thus, to run these JavaScript files, you need to install and run ImageJ with a JVM (_Java Virtual Machine_) version 10 or 11.

1. The best option is to download the "Platform Independent" ImageJ [Link](https://imagej.nih.gov/ij/download.html).
2. Then, go to the website [OpenJDK](https://openjdk.java.net/), choose the [archive versions](https://jdk.java.net/archive/) and download version 11.
3. The last tricky part &mdash; specially if you have other JDKs in your computer &mdash; is to modify the Java path for ImageJ to be sure that it runs on the good (version 11) Java Virtual Machine.


#### Linux
you need to modify the file `ImageJ/run`.
For example, if **ImageJ** is installed in a sub-directory `bin/` in your home directory and you download the JDK in the same directory `bin/`. Your file `run` will be:

```bash
#!/bin/bash
~/bin/jdk-11/bin/java -Xmx2048m -jar ij.jar 
```

#### Windows
TODO

#### Mac
TODO
