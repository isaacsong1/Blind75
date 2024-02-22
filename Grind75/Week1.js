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
        // Initialize an empty hash map
        const hash = Object.create(null);
        // Iterate through the length of the nums array
        for (let i = 0; i < nums.length; i++) {
            // Initialize a pointer to the current value of nums
            const currentEl = nums[i];
            // Subtract the pointer to the target and see what value we are missing
            const missingEl = target - currentEl;
            // If there is a matching key for the missing element,
            if (hash[missingEl] !== undefined) {
                // Return an array of the index and what the missing value is
                return [i, hash[missingEl]];
            }
            // Set the keys of the hash map to each value of nums and the entry to the index
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

//? 20. Valid Parentheses (https://leetcode.com/problems/valid-parentheses/description/)

/* DIRECTIONS
    Given a string s containing just the characters '(', ')', '{', '}', '[', and ']', determine if the input string is valid.

    An input string is valid if:
    1. Open brackets must be closed by the same type of brackets.
    2. Open brackets must be closed in the correct order.
    3. Every close bracket has a corresponding open bracket of the same type.
*/  

/* EXAMPLES
1:  
    Input: s = '()'
    Output: true
2:
    Input: s = '()[]{}'
    Output: true
3:
    Input: s = '(]'
    Output: false
*/

/* CONSTRAINTS
    1 <= s.length <= 10^4
    s consists of parenthese only '()[]{}'
*/

/* IDEA
    My initial idea is to go iterate through each character in the string and have conditional statements to check whether or not the closing bracket is correct.

    I thought that this would be inefficient and thought I would go with a stack. We check if the value is an opening bracket and add it to the stack. If not, we check which opening
    bracket is in the stack and check if the current closing is the same. If it is, pop the last value. If they are not the same return false.
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    for (let c of s) {
        if (c === '(' || c === '[' || c === '{' ) {
            stack.push(c);
        } else {
            if (!stack.length ||
                (c === ')' && stack[stack.length - 1] !== '(') ||
                (c === '}' && stack[stack.length - 1] !== '{') ||
                (c === ']' && stack[stack.length - 1] !== '[')) {
                return false;
            }
            stack.pop();
        }
    }
    return !stack.length;
};