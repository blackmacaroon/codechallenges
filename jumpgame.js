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
    let lastGoodIndex = nums.length-1
    for (let i=nums.length-1; i >= 0; i--){
    // non negative
    // always start at array 1
        if(i + nums[i] >= lastGoodIndex ){
            lastGoodIndex = i
        }
    }
    return lastGoodIndex == 0
};

canJump(arr)
canJump(arr1)
canJump(arr2)