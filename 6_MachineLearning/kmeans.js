////////////////::: KMEANS :::////////////////

const euclidean = (v1,v2) => {
  let sum = 0.0;
  for (let i=0; i < v1.length; i++) {
    sum += (v1[i] - v2[i])*(v1[i] - v2[i]);
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

const randomCentroids = (points, k) => {
  let centroids =  points.slice(0); // copy
  centroids.sort(() => Math.round(Math.random()) - 0.5 );
  return centroids.slice(0, k);
}

/**
 *
 * Arthur, David and Sergei Vassilvitski (2007) 
 * K-means++: The Advantages of Careful Seeding. SODA 2007.
 */
const kppCentroids = (points, k) => {
  // Randomly choose the first centroid
  let centroids =  new Array(k);
  centroids[0] = Math.floor(Math.random() * points.length);
  // Compute distances
  let d = Array.from({length: points.length - 1}, (v,i) => distance(centroids[0],points[i]));
  centroids.sort(() => Math.round(Math.random()) - 0.5 );
  // Compute Density Probability D2(x)
  let p = Math.random();
  return centroids);
}

const nearestCentroid = (point, centroids, distance) => {
   let min = Infinity;
   let index = 0;
   for (let i = 0; i < centroids.length; i++) {
      let dist = distance(point, centroids[i]);
      if (dist < min) {
         min = dist;
         index = i;
      }
   }
   return index;
}

// TODO
const calcCentroid = (points,list) => {
  list.reduce( (newCentroid,index) => {
    newCentroid[g] += points[index][g];
    return newCentroid;
  },
    new Array(points[0].length).fill(0)
  );
  
  
  for (let g = 0; g < centroid.length; g++) {
    var sum = 0;
    for (let i = 0; i < assigned.length; i++) {
       sum += assigned[i][g];
    }
    newCentroid[g] = sum / assigned.length;
  }
}

function Kmeans(K) {
  this.clusters = new Array(K);
}

Kmeans.prototype.fit = (vectors,distance=squaredEuclidean) => {
  let assignment = new Array(vectors.length);
  
  let centroids = randomCentroids(vectors,K);
  // console.log(centroids);
  // Step #2 - Iterative process
   let iterations = 0;
   let converged = false;
   while (!converged) {
      // update point-to-centroid assignments
      for (var i = 0; i < vectors.length; i++) {
         assignment[i] = nearestCentroid(vectors[i], centroids,distance);
      }

      // update location of each centroid
      converged = true;
      for (let j = 0; j < K; j++) {
         let assigned = Array.from({length: vectors.length}, (v,i)=> i).filter( (i) => assignment[i] === j);

         if (!assigned.length) {
            continue;
         }
         let centroid = centroids[j];
         let newCentroid = new Array(centroid.length);

         for (let g = 0; g < centroid.length; g++) {
            let sum = 0;
            for (let i = 0; i < assigned.length; i++) {
               sum += vectors[assigned[i]][g];
            }
            newCentroid[g] = sum / assigned.length;
            
            if (newCentroid[g] !== centroid[g]) {
               converged = false;
            }
         }
         centroids[j] = newCentroid;
         clusters[j] = assigned;
      }
      iterations++;
      
      console.log('Iteration #'+iterations);
      console.log(JSON.stringify(clusters));
   }
  return clusters;
}
