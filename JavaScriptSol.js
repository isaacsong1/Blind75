//? 1. Two Sum (https://leetcode.com/problems/two-sum/)
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

//? 121. Best Time to Buy and Sell Stock (https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
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
    // let profit = 0;
    // let buyPrice = prices[0];
    // for (let i = 0; i < prices.length; i++) {
    //     if (prices[i] < buyPrice) {
    //         buyPrice = prices[i]
    //     } else if (prices[i] - buyPrice > profit) {
    //         profit = prices[i] - buyPrice;
    //     }
    // }
    // return profit;
    // -----
    // Similar but alternate solution 
    // let left = 0;// buy
    // let right = 0; // sell
    // let max_profit = 0;
    // while (right < prices.length) {
    //     if (prices[left] < prices[right]) {
    //         let profit = prices[right] - prices[left]; // current profit
    //         max_profit = Math.max(max_profit, profit);
    //     } else {
    //         left = right;
    //     }
    //     right ++;
    // }
    // return max_profit
    // -----
    // My final solution
    // Time: O(N)
    // Space: O(1)
    let profit = 0;
    let buyPrice = prices[0];
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < buyPrice) {
            buyPrice = prices[i]
        } else {
            profit = Math.max(profit, prices[i] - buyPrice);
        }
    }
    return profit;
};

/*---------------------------------------------------------------------------------------------------*/

//? 217. Contains Duplicate (https://leetcode.com/problems/contains-duplicate/description/)
/* DIRECTIONS
    Given an integer array (nums), return true if any value appears at least twice in the array, and return false if every element is distinct
*/  

/* EXAMPLES
1: 
    Input: nums = [1, 2, 3, 1]
    Output: true
2:
    Input: nums = [1, 2, 3, 4]
    Output: false
3:
    Input: nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
    Output: true
*/

/* CONSTRAINTS
    1 <= nums.length <= 10^5
    -10^9 <= nums[i] <= 10^9
*/

/* IDEA
    Create a set of this array and compare sizes. If same, return false, if not return true
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    // Time: O(1)
    // Space: O(n)
    const numsSet = newSet(nums);
    return numsSet.size !== nums.length;
};

/*---------------------------------------------------------------------------------------------------*/

//? 238. Product of Array Except Self (https://leetcode.com/problems/product-of-array-except-self/description/)
/* DIRECTIONS
    Given an integer array (nums), return AN ARRAY (answer) such that answer [i] is equal to the product of all the elements of nums EXCEPT nums[i].

    The product of any prefix or suffic of nums is guaranteed to fit in a 32-bit integer.

    You must write an algoithm that runs in O(n) time and without using the division operation.
*/  

/* EXAMPLES
1: 
    Input: nums = [1, 2, 3, 4]
    Output: [24, 12, 8, 6]
2:
    Input: nums = [-1, 1, 0, -3, 3]
    Output: [0, 0, 9, 0, 0]
*/

/* CONSTRAINTS
    2 <= nums.length <= 10^5
    -30 <= nums[i] <= 30
*/

/* IDEA
    The idea of this problem is that for each index, we are multiplying everything on the LEFT (prefix) times everything on the RIGHT (suffix). For the prefix multiples, we can skip the first index since
    there is nothing to the left. Same for the suffix multiples. After, the result array will be the prefix times the suffix.
*/

/**
 * @param {number[]} nums
 * @return {number[]}
*/
var productExceptSelf = function(nums) {
    /* NOT IDEAL SOLUTION 
        Time: O(n)
        Space: O(n) (excluding the array)
        Initialize prefix array to keep track of multiples on the left
        const prefix = [];

        Calculate prefix
        for (let i = 0; i < nums.length; i++) {
            if (i === 0) {
                Set first index to 1 since nothing on the left
                prefix[i] = 1;
            } else {
                Else, multiply nums[i - 1] times prefix[i - 1] and set current index of prefix to that value
                prefix[i] = nums[i - 1] * prefix [i - 1];
            }
        }

        Initialize suffix array to keep track of multiples on the right
        const suffix = [];

        Calculate suffix by looping backwards
        for (let i = nums.length - 1; i >= 0; i--) {
            if (i === nums.length - 1) {
                Set last position of suffix to 1 since nothing on the right
                suffix[i] = 1;
            } else {
                Else, multiply nums[i + 1] times suffix[i + 1] and set the current index of suffix to that value
                suffix[i] = nums[i + 1] * suffix[i + 1];
            }
        }

        Initialize our result array
        const result = []

        Loop one more time and set result equal to prefix times suffix
        for (let i = 0; i < nums.length; i++) {
            result[i] = prefix[i] * suffix[i];
        }

        return result;
    */

    //! To reduce space complexity to O(1) (excluding the result array), we can eliminate the prefix and suffix array and update the result array twice.
    // Time: O(n)
    // Space: O(1)
    // Initialize result array
    const result = [];

    // Initialize a prefix variable to 1
    let prefix = 1;

    // Iterate over the indeces of the nums array and set the result at each index to the prefix multiples and update the prefix variable
    for (let i = 0; i < nums.length; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    // Initialize a suffix variable to 1
    let suffix = 1;

    // Iterate in reverse order and multiple the result at each index to the suffix array and update the suffix array 
    for (let i = nums.length - 1; i >= 0; i-- ) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
};