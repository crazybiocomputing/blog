/*
 * Utilities
 * 2020/11/25
 * Jean-Christophe Taveau
 *
 */

function euclidean(u,v) {
  let sum = 0;
  for (let i = 0; i < u.length;i++) {
    sum += (u[i] - v[i]) * (u[i] - v[i]);
  }
  return Math.sqrt(sum);
}

const squaredEuclidean = (v1,v2) => {
  let sum = 0.0;
  for (let i=0; i < v1.length; i++) {
    sum += (v1[i] - v2[i])*(v1[i] - v2[i]);
  }
  return sum;
}

function accuracy(u,v) {
  let score = 0;
  for (let i = 0; i < u.length;i++) {
    score += (u[i]=== v[i]) ? 1 : 0;
  }
  return score / u.length;
}
