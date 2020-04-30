// Given an array of non-negative integers, you are initially positioned at the first index of the array.
// Each element in the array represents your maximum jump length at that position.
// Determine if you are able to reach the last index.

// CONSTRAINTS
// 1 <= nums.length <= 3 * 10^4
// 0 <= nums[i][j] <= 10^5
arr = [ 2, 3, 1, 1, 4 ]
arr1 = [ 3, 2, 1, 0, 4 ]
arr2 = [ 0, 2, 3, 1 ]

var canJump = function(nums) {
    // edge cases? non negative, array length? 
    // always starts at array 1
    if(nums.length === 1) return true;
    // start at the end of the array
    let lastGoodIndex = nums.length-1
    // traverse backwards
    // if you're at the last index, check if each value at the prior index is good to get to the last one, yes/no
    for (let i=nums.length-1; i >= 0; i--){
        // if the current position + nums[i] is >= to the lastGoodIndex, then swap that value for the last good index position
        if(i + nums[i] >= lastGoodIndex ){
            lastGoodIndex = i
        }
    }
    // return boolean
    return lastGoodIndex == 0
};

canJump(arr)
canJump(arr1)
canJump(arr2)