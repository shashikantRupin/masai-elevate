/*Longest Consecutive Sequence
Given an unsorted array, find the length of the longest consecutive elements sequence
Solve in O(n) time using Set*/ 


function ConsecutiveSequence(arr) {
  const set = new Set(arr);

  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    if (!set.has(num - 1)) {
      // check if the num is first in sequence
      let currNum = num;
      let count = 1;
      while (set.has(currNum + 1)) {
        count++;
        currNum++;
      }
      if (max < count) {
        max = count;
      }
    }
  }
  console.log("max-", max);
}

const arr = [1, 2, 3, 5, 2, 1, 4];

ConsecutiveSequence(arr);
