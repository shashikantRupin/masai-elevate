/*Top K Frequent Elements
Given an array and integer K, return the K most frequent elements*/

function topElements(arr, k) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (obj[num]) {
      obj[num]++;
    } else {
      obj[num] = 1;
    }
  }
  // console.log("obj",obj)
  let result = [];

  for (let i = 0; i < 3; i++) {
    let max = 0;
    let mostFrequent = 0;
    for (let key in obj) {
      if (obj[key] > max) {
        max = obj[key];
        mostFrequent = key;
      }
    }
    result[i] = mostFrequent;
    delete obj[mostFrequent];
  }

  console.log("most-frequent", result);
}
const arr = [1, 2, 1, 3, 4, 3, 1, 4, 4, 4];
let k = 2;

topElements(arr, k);
