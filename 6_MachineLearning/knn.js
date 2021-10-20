/*
 *  CrazyBioComputingBlog: JavaScript code for Image(J)
 *  Copyright (C) 2018-2021  Jean-Christophe Taveau.
 *
 *  This file is part of CrazyBioComputingBlog.
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,Image
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with CrazyBioComputingBlog.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */

/*
 * k-Nearest Neighbor Classifier for k=1
 * 2020/11/25
 * Jean-Christophe Taveau
 *
 */ 
function new_knn(k=1) {
  return {
    k : k
  };
}

function knn_fit(learner,X_train,y_train) {
  learner.X_train = X_train;
  learner.y_train = y_train;
}

function knn_predict(learner,X_test) {

  // Private function
  function closest(row) {
    let best_dist = euclidean(row,learner.X_train[0]);
    let best_index = 0;
    for (let i = 1; i < learner.X_train.length; i++) {
      let dist = euclidean(row,learner.X_train[i]);
      if (dist < best_dist) {
        best_dist = dist;
        best_index = i;
      }
    }
    return learner.y_train[best_index];
  }
  
  // Main functions
  let predictions = [];
  for (let i = 0; i < X_test.length; i++) {
    let row = X_test[i];
    let label = closest(row);
    predictions.push(label);
  }
  return predictions;
}
