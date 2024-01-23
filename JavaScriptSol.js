//? Two Sum (https://leetcode.com/problems/two-sum/)
//! Completed during Software Engineering Bootcamp
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
    // Pseudocode
    // Loop through the length of the nums array
    // Nested loop through the same length of the nums array
    // If index is the same, continue
    // Else add the numbers at the indeces and see it they equal target

    var twoSum = function(nums, target) {
        //-----------------------------------------
        // Time O(N) - linear
        // Space O(N) - linear
        const hash = Object.create(null);
        for (let i = 0; i < nums.length; i++) {
            const currentEl = nums[i];
            const missingEl = target - currentEl;
            if (hash[missingEl] !== undefined) {
                return [i, hash[missingEl]];
            }
            hash[currentEl] = i
    }
    //-----------------------------------------
    // Original Attempt
    // Time O(N^2)
    // Space O(1)
    // for (let i = 0; i < nums.length; i++) { // At worst I loop through the whole array (N)
    //     for (let j = i + 1; j < nums.length; j++) { // At worst I loop through the whole array (N)
    //         if (nums[i] + nums[j] === target) {
    //             return [i, j];
    //         }
    //     }
    // }
};

/*---------------------------------------------------------------------------------------------------*/

//? Best Time to Buy and Sell Stock (https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
//! Practice Whiteboard Coding
// R - Repeat the problem
// E - Write out examples
// A - Describe your approaches
// C - Write your code
// T - Test
// O - Optimization
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    
};