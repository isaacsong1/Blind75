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
    New idea: Use list comprehension and .isalnum() to create an array of characters that are alphanumeric. Then check if the reverse of the array is the same as the array and return 
    True if so.
*/

// class Solution(object):
//     def isPalindrome(self, s):
//         """
//         :type s: str
//         :rtype: bool
//         """
//         str_lower = [char.lower() for char in s if char.isalnum()]
//         if str_lower == str_lower[::-1]:
//             return True
//         return False
        

//? 226. Invert Binary Tree (https://leetcode.com/problems/invert-binary-tree/description/)
// TODO: DONE IN PYTHON

/* DIRECTIONS
    Given the root of a binary tree, invert the tree, and return its root.
*/  

/* EXAMPLES
1:  
    Input: root = 4, 2, 7, 1, 3, 6, 9]
    Output: [4, 7, 2, 9, 6, 3, 1]
2:
    Input: root = [2, 1, 3]
    Output: [2, 3, 1]
3:
    Input: root = []
    Output: []
*/

/* CONSTRAINTS
    The number of nodes in the tree is in the range [0, 100]
    -100 <= Node.val <= 100
*/

/* IDEA
    Going to use a recursive approach using Depth First Search.
    First we check if our root has values and return None if there is nothing. With our root, we want to swap[ the left and right, then recursively call our function passing the node's
    child to reverse it.
*/

// Time: O(n)
// Space: O(n) where n is the number of recursive calls
// class Solution(object):
//     def invertTree(self, root):
//         """
//         :type root: TreeNode
//         :rtype: TreeNode
//         """
//         if not root:
//             return None
        
//         temp = root.left
//         root.left = root.right
//         root.right = temp

//         self.invertTree(root.left)
//         self.invertTree(root.right)

//         return root

//? 242. Valid Anagram (https://leetcode.com/problems/valid-anagram/description/)

/* DIRECTIONS
    Given two strings s and t, return true if t is an anagram of s, and false otherwise.

    An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
*/  

/* EXAMPLES
1:  
    Input: s = 'anagram', t = 'nagaram'
    Output: true
2:
    Input: s = 'rat', t = 'car'
    Output: false
*/

/* CONSTRAINTS
    1 <= s.length, t.length <= 5 * 10^4
    s and t consist of lowercase English letters
*/

/* IDEA
    I could create a hash map with the letter as the key and the amount of times the letter appears as the value. Once we do that, we compare the count from t to s and if they are equal
    return true.

    Different easier idea: Split the strings, sort the array, and join all the characters into a string and compare each new string.
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    sorted_s = s.split('').sort().join();
    sorted_t = t.split('').sort().join();
    return sorted_s === sorted_t;
};

//? 704. Binary Search (https://leetcode.com/problems/binary-search/description/)

/* DIRECTIONS
    Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index.
    Otherwise, return -1.

    You must write an algorithm with O(logn) runtime complexity.
*/  

/* EXAMPLES
1:  
    Input: nums = [-1, 0, 3, 5, 9, 12], target = 9
    Output: 4
    Explanation: 9 exists in nums and its index is 4
2:
    Input: nums = [-1, 0, 3, 5, 9, 12], target = 2
    Output: -1
    Explanation: 2 does not exist in nums so return -1
*/

/* CONSTRAINTS
    1 <= nums.length <= 10^4
    -10^4 < nums[i], target < 10^4
    All the integers in nums are unique
    nums is sorted in ascending order
*/

/* IDEA
    The idea of binary search is to iterate until the desired target is reached. Each iteration involves 'splitting' the array length in half and checking if the target is above or below
    the value at the midpoint.
    If the value of the array at the midpoint is equal to our target, return the index.
    If the value of the array at the midpoint is greater than our target, set our iteration condition equal to the midpoint index.
    Else, set the length of the array equal to the midpoint to start searching the right half of the array.

    Outside the loop, return -1.
*/

// ITERATEIVE SOLUTION
// Time: O(logn) (n is how many iterations it takes to reawch the desired target)
// Space: O(1) (Uses constant amount of space of two pointers and one mid index variable
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // Initialize two pointers, one for the left of the array and one for the right
    let left = 0;
    let right = nums.length - 1;

    // Iterate while left pointer is less than or equal to the right...
    while (left <= right) {
        // Calculate index at the middle
        const mid = Math.floor((left + right) / 2);
        // Checks if the middle of the array is equal to the target
        if (nums[mid] === target) {
            return mid;
        }
        // If the midpoint value is greater than the target, update the right pointer to only use the first half of the nums array
        if (nums[mid] > target) {
            right = mid - 1;
        } 
        // Else, update the left pointer to check the values of the second half of the nums array
        else {
            left = mid + 1;
        }
    }
    // When iteration finishes, return -1 if the target was not found.
    return -1;
};

//? 733. Flood Fill (https://leetcode.com/problems/flood-fill/description/)

/* DIRECTIONS
    An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.

    You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

    To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels
    connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all the aforementioned pixels with color.

    Return the modified image after performing the flood fill.
*/  

/* EXAMPLES
1:  
    Input: image = [[1, 1, 1], [1, 1, 0], [1, 0, 1]], sr = 1, sc = 1, color = 2
    Output: [[2, 2, 2], [2, 2, 0], [2, 0, 1]]
    Explanation: From the center of the image with position (sr, sc) = (1, 1), all pixels connected by a path of the same color as the starting pixel are colored with the new color.
        Note that the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.
2:
    Input: image = [[0, 0, 0], [0, 0, 0]], sr = 0, sc = 0, color = 0
    Output: [[0, 0, 0], [0, 0, 0]]
    Explanation: The starting pixel is already colored 0, so no changes are made to the image.
*/

/* CONSTRAINTS
    m == image.length
    n == image[i].length
    1 <= m, n <= 50
    0 <= image[i][j], color < 2^16
    0 <= sr < m
    0 <= sc < n
*/

/* IDEA
    Immediately looking at this, I thought of using a recursive solution. From the starting coordinate, we will check each value 4-directionally (up, right, down, left) and update
    the values accordingly. If our initial point is equal to the target, return the original image. Else, update the starting value with the target and begin checking positions
    4-directionally until neighboring numbers equal to the starting value are updated.

    NOTE: I followed a youtube video since solutions were a bit confusing (https://www.youtube.com/watch?v=OODFEqJxiDo)
*/


// Time: O(m x n)
// Space: O(m x n)
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, color) {
    const startingPoint = image[sr][sc];

    function recurse(image, sr, sc) {
        // Check boundaries
        // sr < 0 || sr > image.length - 1 checks that sr (starting row) is within the bounds
        // sc < 0 || sc > image[0].length - 1 checks that sc (starting column) is within the bounds
        // image[sr][sc] !== startingPoint checks if the value is equal to our starting value
        // image[sr][sc] === color checks if our starting point is the color
        if (sr < 0 || sr > image.length - 1 || sc < 0 || sc > image[0].length - 1 || image[sr][sc] !== startingPoint || 
        image[sr][sc] === color) return image;

        // Update position to color
        image[sr][sc] = color;
        
        // Check down one row
        recurse(image, sr + 1, sc);
        // Check up one row
        recurse(image, sr - 1, sc);
        // Check right one column
        recurse(image, sr, sc + 1);
        // Check left one column
        recurse(image, sr, sc - 1);

        return image;
    }

    // Begin recursion
    return recurse(image, sr, sc);
};

//? 235. Lowest Common Ancestor of a Binary Search Tree (https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)

/* DIRECTIONS
    Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

    According to the definition of LCA on Wikipedia (https://en.wikipedia.org/wiki/Lowest_common_ancestor): 'The lowest common ancestor is defined between two nodes, p and q, as the
    lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).'
*/  

/* EXAMPLES
1:  
    Input: root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 8
    Output: 6
    Explanation: The LCA of nodes 2 and 8 is 6
2:
    Input: root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p = 2, q = 4
    Output: 2
    Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition
3:
    Input: root = [2, 1], p = 2, q = 1
    Output: 2
*/

/* CONSTRAINTS
    The number of nodes in the tree is in the range [2, 10^5]
    -10^9 <= Node.val <= 10^9
    All Node.val are unique
    p != q
    p and q will exist in the BST
*/

/* IDEA
    For binary search trees, they are ordered so that everything on the left of the root is less than the root and everything on the right of the root is greater than the root.

    Initialize a variable that keeps track of which parent we are checking. Then, if both p and q are less than the node, then update the parent to the next highest root. If greater, 
    update parent to the next highest. If p is less than the root, and q is greater than the root, return the parent.
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root
    }
};