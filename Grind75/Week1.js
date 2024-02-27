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
    // Time: O(n)
    // Space: O(n)
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

/*---------------------------------------------------------------------------------------------------*/

//? 21. Merge Two Sorted Lists (https://leetcode.com/problems/merge-two-sorted-lists/description/)
//! Done during bootcamp

/* DIRECTIONS
    You are given the heads of two sorted linked lists list1 and list2.

    Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
    
    Return the head of the merged linked list.
*/  

/* EXAMPLES
1:  
    Input: list1 = [1, 2, 4], list2 = [1, 3, 4]
    Output: [1, 1, 2, 3, 4, 4]
2:
    Input: list1 = [], list2 = []
    Output: []
3:
    Input: list1 = [], list2 = [0]
    Output: [0]
*/

/* CONSTRAINTS
    The number of nodes in both lists is in the range [0, 50]
    -100 <= Node.val <= 100
    Both list1 and list2 are sorted in non-decreasing order
*/

/* IDEA
    This will be a recursive solution in JavaScript. We did this during our algo club and used Python. We went over two solution, one iterative (O(n) time where N is # of nodes
    in the smallest list and O(1)). Another is the recursive solution where both time and space complexities are O(n) where N is the number of nodes in the list that has the highest
    count of small elements for Time and N is the # of recursive calls stored in the stack

    I will be going for the recursive solution.
    First we check if our lists are empty and return either list if they are.
    Then, we check if list1.val < list2.val. If it is, we recursively call our function again using list1.next and list2 and return list1. Else, recursively call our function using 
    list1 and list2.next and return list2.
    
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
// Time: O(N) where N is the # of nodes in the list that has the highest count of small els
// Space: O(N) where N is the # of recursive calls stored in the stack
var mergeTwoLists = function(list1, list2) {
    if (!list1 || !list2) {
        return list1 || list2;
    }
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next)
        return list2;
    }
};

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
    /* NOT IDEAL SOLUTION
        Time: O(n)
        Space: O(1)
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
        -----
        Similar but alternate solution 
        let left = 0;// buy
        let right = 0; // sell
        let max_profit = 0;
        while (right < prices.length) {
            if (prices[left] < prices[right]) {
                let profit = prices[right] - prices[left]; // current profit
                max_profit = Math.max(max_profit, profit);
            } else {
                left = right;
            }
            right ++;
        }
        return max_profit
    */

    // My final solution
    // Time: O(N)
    // Space: O(1)
    // Initialize initial profit variable
    let profit = 0;
    // Initialize initial buy price variable
    let buyPrice = prices[0];
    // Iterate through the length of the prices array. If there is a lower buy price, update the buy price variable to the lower cost. Else, update the profit variable by taking the 
    // maximum between the initial profit and the current price minus the price you bought the stock for.
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < buyPrice) {
            buyPrice = prices[i]
        } else {
            profit = Math.max(profit, prices[i] - buyPrice);
        }
    }
    return profit;
};

//? 125. Valid Palindrome (https://leetcode.com/problems/valid-palindrome/description/)
//! Practice Whiteboard Coding
// R - Repeat the problem
// E - Write out examples
// A - Describe your approaches
// C - Write your code
// T - Test
// O - Optimization

/* DIRECTIONS
    A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.
    Alphanumeric characters include letters and numbers.

    Given a string s, return true if it is a palindrome or false otherwise.
*/  

/* EXAMPLES
1:  
    Input: s = 'A man, a plan, a canal: Panama'
    Output: true
    Explanation: 'amanaplanacanalpanama' 
2:
    Input: s = 'race a car'
    Output: false
    Explanation: 'raceacar' is not a palindrome
3:
    Input: s = ' '
    Output: true
    Explanation: s is an empty string '' after eremoving non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.
*/

/* CONSTRAINTS
    1 <= s.length <= 2 * 10^5
    s consists only of printable ASCII characters
*/

/* IDEA
    This will be easier to solve in Python.
    First, I want to change all letters to lowercase. Then, iterate through the string and add letter to a variable while skipping non-alphanumeric values. Then, we compare the string
    saved to string[::-1]
*/

