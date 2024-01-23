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

/* DIRECTIONS
    You are given an array (prices) where prices[i] is the price of the given stock on the ith day. You want to maximize your profit by choosing ONE day to buy one stock and 
    choosing a DIFFERENT day to sell it. 
    RETURN: The maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
*/  

/* EXAMPLES
1:  
    Input: prices = [7, 1, 5, 3, 6, 4]
    Output: 5
    Explanation: Day 2 (price = 1) and sell day 5 (prices = 6)

2:
    Input: prices = [7, 6, 4, 3, 1]
    Output: 0
    Explanation: No profits
*/

/* CONSTRAINTS
    1 <= prices.length <= 10^5
    0 <= prices[i] <= 10^4
*/

/* IDEA
    Loop through the array once. Store first value in a variable to represent buy price. Then next iteration, compare if there is profit. If no profit, update buy variable and iterate
*/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Time: O(n)
    // Space: O(1)
    let profit = 0;
    let buyPrice = prices[0];
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < buyPrice) {
            buyPrice = prices[i]
        } else if (prices[i] - buyPrice > profit) {
            profit = prices[i] - buyPrice;
        }
    }
    return profit;
};