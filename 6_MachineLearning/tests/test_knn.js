/*
 * k-Nearest Neighbor Classifier
 * 2018/10/17
 * Jean-Christophe Taveau
 *
 */

'use strict';
 
////////////// IMPORTS //////////////

// Import nashorn polyfill
const IJ_PLUGINS = IJ.getDir('plugins');
load(`${IJ_PLUGINS}/crazybio/nashorn_polyfill.js`);
load(`${IJ_PLUGINS}/crazybio/common.js`);
load(`${IJ_PLUGINS}/crazybio/ML/knn.js`);

// labels
const labels = [
4,0,0,3,4,0,4,0,3,3,
4,3,3,0,4,3,3,4,3,4,
4,4,0,4,3,0,0,3,3,4,
0,4,0,3,0,0,4,4,4,3,
0,4,3,4,4,3,3,3,3,3,
0,0,3,3,0,3,0,4,3,0,
0,4,0,3,0,3,4,4,4,4,
0,3,3,4,4,3,3,4,4,4,
0,3,4,3,4,3,0,0,4,3,
0,3,0,3,4,3,4,0,4,3,
3,4,4,0,3,4,0,4,4,4,
0,0,4,3,3,0,3,3,3,0,
4,4,4,0,3,4,3,0,4,4,
3,0,0,4,0,4,3,3,4,4,
0,0,4,4,4,0,3,4,3,4,
3
];
 
// Step #1 - Data pre-processing
let table = ResultsTable.getResultsTable();
let area = table.getColumn(table.getColumnIndex('Area'));
let circ = table.getColumn(table.getColumnIndex('Circ.'));
let solid = table.getColumn(table.getColumnIndex('Solidity'));

// Create matrix from columns
let dataset = [];
for (let i = 0; i < area.length; i++) {
  let x0 = area[i];
  let x1 = circ[i];
  let x2 = solid[i];
  let v = [x0,x1,x2];
  dataset.push(v); // Python append
}

// Create Training + Test sets
let len = Math.floor(area.length * 0.6); // 60% for training set
let X_train = dataset.slice(0,len);
let X_test = dataset.slice(len);
let y_train = labels.slice(0,len);
let y_test = labels.slice(len);

// Step #2 - k-NN
let knn = new_knn();
knn_fit(knn,X_train,y_train);
let y_pred = knn_predict(knn,X_test);

// Step #3 - Checking
let score = accuracy(y_test,y_pred);
print(`Accuracy: ${score}`);
