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
