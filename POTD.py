# 1/29/2024
# 232. Implement Queue using Stacks (https://leetcode.com/problems/implement-queue-using-stacks/description/?envType=daily-question&envId=2024-01-29)
''' DIRECTIONS
    Implement a first in first (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, empty)

    Implement the MyQueue class:
    - void push(int x) Pushes element x to the back of the queue
    - int pop() Removes the element from the front of the queue and returns it
    - int peek() Returns the element at the front of the queue
    - boolean empty() Returns true if the queue is empty, false otherqise

    Notes:
    - You must use ONLYT standard operations of a stack, which means only 'push to top', 'peek/pop from top', 'size', and 'is empty' operations are valid
    - Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque(double-ended queue) as long as you use only
        a stack's standard operations

'''

''' EXAMPLES
1.
    Input:
        ["MyQueue", "push", "push", "peek", "pop", "empty"]
        [[], [1], [2], [], [], []]
    Output:
        [null, null, null, 1, 1, false]
    Explanation:
        MyQueue myQueue = new MyQueue();
        myQueue.push(1); // queue is: [1]
        myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
        myQueue.peek(); // return 1
        myQueue.pop(); // return 1, queue is [2]
        myQueue.empty(); // return false
'''

''' CONSTRAINTS
    1 <= x <= 9
    At most 100 calls will be made to push, pop, peek, and empty
    All the calls to pop and peek are valid.

'''

''' IDEA 
    Did this problem with cohort mates. Our initial idea was to initialize an empty list then use list methods to meet the requirements for the methods implemented (In comments).
    Then we tried to optimize a little bit and came across deques or double-ended queues. These are preferred over lists when we need quicker append and pop operations from both
    ends of the container, as deque provides an O(1) time complexity for append and pop operations as compared to a list that provides O(n) time complexity.
    This is why we import collections (includes deque methods).
'''

import collections
class MyQueue:

    def __init__(self):
        # self.my_queue = []
        self.my_queue = deque([])

    def push(self, x: int) -> None:
        self.my_queue.append(x)

    def pop(self) -> int:
        # return self.my_queue.pop(0)
        return self.my_queue.popleft()

    def peek(self) -> int:
        return self.my_queue[0]

    def empty(self) -> bool:
        return len(self.my_queue) == 0

# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()
    
# ------------------------------------------------------------------------------------
# 1/30/2024
# 150. Evaluate Reverse Polish Notation (https://leetcode.com/problems/evaluate-reverse-polish-notation/description/)
''' DIRECTIONS
    You are given an array of strings (tokens) that represents an arithmetic expression in Reverse Polish Notation (http://en.wikipedia.org/wiki/Reverse_Polish_notation)

    Evaluate the expression. Return an integer that represnets the value of the expression.

    NOTE that:
    - The valid operators are '+', '-', '*', and '/'.
    - Each operand may be an integer or another expression.
    - The division between two integeres always truncates TOWARDS ZERO.
    - There will not be any division by zero.
    - The input represents a valid arithmetic expression in a reverse polish notation.
    - The answer and all the intermediate calculations can be represented in a 32-bit integer.
'''

''' EXAMPLES
1.
    Input: tokens = ["2", "1", "+", "3", "*"]
    Output: 9 
    Explanation: ((2 + 1) * 3) = 9
2.
    Input: tokens = ["4", "13", "5", "/", "+"]
    Output: 6
    Explanation: (4 + (13 / 5)) = 6
3.
    Input: tokens = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
    Output: 22
    Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
                = ((10 * (6 / (12 * -11))) + 17) + 5
                = ((10 * (6 / -132)) + 17) + 5
                = ((10 * 0) + 17) + 5
                = (0 + 17) + 5
                = 17 + 5
                = 22
'''

''' CONSTRAINTS
    1 <= tokens.length <= 10^4
    tokens[i] is either an operator or an integer in the range [-200, 200]
'''

''' IDEA 
    Original idea was to iterate through the array until we find an operator then compute what we need with the value before and the value before that. We ran into a problem where we
    were repeating a lot of lines of code and had to keep updating our index which resulted in slow run time and ugly code.

    We kept trying and stumbled upon a solution that cleared it up. We used a stack (LIFO) which is a list. We iterate through the array and check if our value is an operator or not.
    If it is an number, convert the string to an integer and append it to our stack. If it is an operator, pop the last two values and store in separate variables. Then we check what 
    operator we are using then compute what we need using our two values. I ended up using a separate function to check the operator type and calculate the expression. Then append 
    our new value to the stack. Return the last value in our stack.
'''
class Solution:
    def calculator(self, int1, int2, operator):
        if operator == '+':
            return int2 + int1
        elif operator == '-':
            return int2 - int1
        elif operator == '*':
            return int2 * int1
        else:
            return int(int2 / int1)
        
    def evalRPN(self, tokens: List[str]) -> int:
        ans = []

        # Better solution
        # Time: O(n)
        # Space: O(n)
        for token in tokens:
            if token in '+-*/':
                int1 = ans.pop()
                int2 = ans.pop()
                operator = token
                temp_ans = self.calculator(int1, int2, operator)
                ans.append(int(temp_ans))
            else: 
                ans.append(int(token))
        return ans.pop()

        # Alternate solution (no outside function)
        # Time: O(n)
        # Space: O(n)
        # for token in tokens:
        #     if token not in '+-*/':
        #         ans.append(int(token))
        #     else:
        #         int1 = ans.pop()
        #         if token == '+':
        #             ans[-1] += int1
        #         elif token == '-':
        #             ans[-1] -= int1
        #         elif token == '*':
        #             ans[-1] *= int1
        #         else:
        #             ans[-1] = int(ans[-1] / int1)
        # return ans[0]
    
# ------------------------------------------------------------------------------------
# 1/31/2024
# 739. Daily Temperatures (https://leetcode.com/problems/daily-temperatures/description/?envType=daily-question&envId=2024-01-31)
''' DIRECTIONS
    Given an array of integers, temperatures, represents the daily temperatures, RETURN an ARRAY, answer, such that answer[i] is the number of days you have to wait after the ith day
    to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.
'''

''' EXAMPLES
1.
    Input: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
    Output: [1, 1, 4, 2, 1, 1, 0, 0]
2.
    Input: temperatures = [30, 40, 50, 60]
    Output: [1, 1, 1, 0]
3.
    Input: temperatures = [30, 60, 90]
    Output: [1, 1, 0]
'''

''' CONSTRAINTS
    1 <= temperatures.length <= 10^5
    30 <= temperatures[i] <= 100
'''

''' IDEA 
    We are going to iterate through the array but we need to keep track of some things. We need an answer array of 0's with the same length as temperatures array. We can use a stack
    to keep track of the indices and pop each item once a higher temperature is reached. This will take up more space since we are initializing a stack.
'''

class Solution:
    # Time: O(n)
    # Space: O(2n) = O(n)
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        # Length of temperatures array
        n = len(temperatures)
        # Array of 0's of length n
        answer = [0] * n
        # Initialize stack
        stack = []

        # Iterate from 0 to n...
        for i in range(n):
            # Save current temperature
            curr_temp = temperatures[i]

            # While stack in not empty and our curr_temp is greater than the temperature at the last index recorded in the stack, pop the index from the stack and save the value in a 
            # variable. Update the answer at that index to i - the index.
            # Explanation for Ex 1: At i = 1: stack = [0]
            #                                 curr_temp = 74
            #                                 temperatures[stack[-1]] = 73
            #                                 item_index = 0
            #                                 answer[0] = 1 - 0 = 1
            while stack and curr_temp > temperatures[stack[-1]]:
                item_index = stack.pop()
                answer[item_index] = i - item_index

            stack.append(i)

        return answer

# ------------------------------------------------------------------------------------
# 2/1/2024
# 2966. Divide Array Into Arrays With Max Difference (https://leetcode.com/problems/divide-array-into-arrays-with-max-difference/description/?envType=daily-question&envId=2024-02-01)
''' DIRECTIONS
    You are given an integer array, nums, of size n and a positive integer k.

    Divide the array into one or more arrays of size 3 satisfying the following conditions:
    - EACH element of nums should be in EXACTLY one array
    - The difference between any two elements in one array is less than or equal to k.

    RETURN a 2D array containing all the arrays. If it is impossible to satisfy the conditions, return an empty array. And if there are multiple answers, return any of them.
'''

''' EXAMPLES
1.
    Input: nums = [1, 3, 4, 8, 7, 9, 3, 5, 1], k = 2
    Output: [[1, 1, 3], [3, 4, 5], [7, 8, 9]]
    Explanation: We can divide the array into the following arrays: [1, 1, 3], [3, 4, 5] and [7, 8, 9].
                The difference between any two elements in each array is less than or equal to 2.
2.
    Input: nums = [1, 3, 3, 2, 7, 3], k = 3
    Output: []
    Explanation: It is not possible to divide the array satisfying all the conditions.
'''

''' CONSTRAINTS
    n == nums.length
    1 <= n <= 10^5
    n is a multiple of 3.
    1 <= nums[i] <= 10^5
    1 <= k <= 10^5s
'''

''' IDEA 
    We know that n will be a multiple of 3 so we don't need to check that. We first want to sort the array since the outputs appear sorted. Once we have that, we want to check the
    first index and every third value after that which we can achieve by denoting a step count. At each 3rd value, we check if the difference between nums[i] and nums]i + 2] is less
    than or equal to k. If it is, append nums[i], nums[i + 1], and nums[i + 2] to an answer array. Else, return empty array.
'''

class Solution:
    def divideArray(self, nums: List[int], k: int) -> List[List[int]]:
        # Time: O(n)
        # Space: O(n)
        # Store length of nums array
        n = len(nums)
        # Destructively sort nums
        nums.sort()
        # Initialize empty answer array
        answer = []

        # Iterate from 0 to n in step size of 3...
        for i in range(0, n, 3):
            # Check if difference is less than or equal to k
            if nums[i + 2] - nums[i] <= k:
                # Append values to answer array (in an array of 3 integers)
                answer.append([nums[i], nums[i + 1], nums[i + 2]])
            else:
                # Return empty array otherwise
                return []
        return answer
        
# ------------------------------------------------------------------------------------
# 2/2/2024
# 1291. Sequential Digits (https://leetcode.com/problems/sequential-digits/?envType=daily-question&envId=2024-02-02)
''' DIRECTIONS
    An integer has sequential digits if and only if each digit in the number is one more than the previous digit.

    RETURN a SORTED list of all the integers in the range [low, high] inclusive that have sequential digits.
'''

''' EXAMPLES
1.
    Input: low = 100, high = 300
    Output: [123, 234]
2.
    Input: low= 1000, high = 13000
    Output: [1234, 2345, 3456, 4567, 5678, 6789, 12345]
'''

''' CONSTRAINTS
    10 <= low <= high <= 10^9
'''

''' IDEA 
    I glimpsed at the solutions since I was not sure where to start. There two approaches.
    Approach 1:
        We can store a sequence from 1 to 9 in a string and an empty array for our answer. We will use a nested for loop with fixed bounds. The outer loop will be from 0 to 9 and the
        inner loop will iterate from i + 1 to 10. We use the indeces to grab sections of the string and check if our number is within the bounds. If it is, append to answer array.
        Sort answer array. Return answer array.
    Approach 2:
        Iterate from 1 to 9. For each digit, initialize a variable to store the next index value. Build a sequential number by adding consecutive digits until reaching 9 or exceeding
        the high value. Add valid sequential numbers to an answer list. Sort the list and return.
'''

class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        # Approach 1:
        # Time: O(1)
        # Space: O(1)
        # sequence = '123456789'
        # answer = []

        # for i in range(0, len(sequence)):
        #     for j in range (i + 1, len(sequence) + 1):
        #         curr_num = int(sequence[i:j])
        #         if low <= curr_num <= high:
        #             answer.append(curr_num)
        
        # answer.sort()

        # return answer
        # ---------------------------
        # Approach 2:
        # Time: O(1)
        # Space: O(1)
        answer = []

        for i in range(1, 10):
            curr_num = i
            next_num = i + 1

            while curr_num <= high and next_num <= 9:
                curr_num = curr_num * 10 + next_num
                if low <= curr_num <= high:
                    answer.append(curr_num)
                next_num += 1

        answer.sort()
        return answer

# ------------------------------------------------------------------------------------
# 2/5/2024
# 387. First Unique Character in String (https://leetcode.com/problems/first-unique-character-in-a-string/description/?envType=daily-question&envId=2024-02-05)
''' DIRECTIONS
    Given a string, s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
'''

''' EXAMPLES
1.
    Input: s = "leetcode"
    Output: 0
2.
    Input: s = "loveleetcode"
    Output: 2
3.
    Input: s = "aabb"
    Output: -1
'''

''' CONSTRAINTS
    1 <= s.length <= 10^5
'''

''' IDEA 
    Iterate through the string and use a dictionary to keep track of how many times a letter appears. Then iterate through the index of the string until you find where the value is 1
    and RETURN the index.
'''

class Solution:
    def firstUniqChar(self, s: str) -> int:
        # Time: O(n)
        # Space: O(U) (U is # of characters in s)
        # Initialize empty dictionary
        letter_count = {}

        # Iterate through the letters in s...
        for letter in s:
            # Get the current count of the letter and increment by one. If none, set the initial value to 0 and add 1.
            letter_count[letter] = letter_count.get(letter, 0) + 1

        # Iterate through the index and letter in s
        for index, letter in enumerate(s):
            # If the letter appeared only once, return the index
            if letter_count[letter] == 1:
                return index
            
        # Return -1 if no unique letters
        return -1
    
# ------------------------------------------------------------------------------------
# 2/6/2024
# 49. Group Anagrams (https://leetcode.com/problems/group-anagrams/description/?envType=daily-question&envId=2024-02-06)
''' DIRECTIONS
    Given an array of strings, strs, group the anagrams together. You can return the answer in any order.

    An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
'''

''' EXAMPLES
1.
    Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
    Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
2.
    Input: strs = [""]
    Output: [[""]]
3.
    Input: strs = ["a"]
    Output: [["a"]]
'''

''' CONSTRAINTS
    1 <= strs.length <= 10^4
    0 <= strs[i].length <= 100
    strs[i] consists of lowercase English letters
'''

''' IDEA 
    One idea:
        Initialize an empty array for the answer. Initialize an empty hashmap to map the sorted version of the string to the key and the index of the answer array as the value.
        Iterate through each string in strs. For each string, sort it and join the letters into one string. If there is an occurence of the letters in the hashmap, append the
        original string using the index given from the sorted letters. Else, create a new key in the hashmap for the sorted string and set the key to the length of the answer array.
        Then append the unsorted string in an array to the answer array. RETURN answer.
'''

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # Time: O(n * k * logk) (k is the length of the longest string in strs)
        # Space: O(n * k) (k is the length of the longest string in strs)
        # Initialize answer array and hashmap dictionary
        answer = []
        hashmap = {}

        # Iterate through strs...
        for string in strs:
            # Sort the string and join letters into one string
            sorted_string = ''.join(sorted(string))
            # Check if the sorted string is in our hashmap
            if sorted_string in hashmap:
                # If so, grab the index value and append string to corresponding array
                answer[hashmap[sorted_string]].append(string)
            else:
                # If not, set the key, value to sorted string and length of answer array
                hashmap[sorted_string] = len(answer)
                # Append unsorted string in an array to answer array
                answer.append([string])
        # Return answer
        return answer
    
# ------------------------------------------------------------------------------------
# 2/7/2024
# 451. Sort Characters By Frequency (https://leetcode.com/problems/sort-characters-by-frequency/description/?envType=daily-question&envId=2024-02-07)
''' DIRECTIONS
    Given a string s, sort it in decreasing order based on the frequency of the characters. The frequency of a character is the number of times it appears in the string.

    Return the sorted string. If there are multiple answers, return any of them.
'''

''' EXAMPLES
1.
    Input: s = "tree"
    Output: "eert"
    Explanation: 'e' appears twice while 'r' and 't' both appear once. So 'e' must appear both before both 'r' and 't'. Therefore "eetr" is also a valid answer.
2.
    Input: s = "cccaaa"
    Output: "aaaccc"
    Explanation: Both 'c' and 'a' appear three times, so both 'cccaaa' and 'aaaccc' are valid answers. Note that 'cacaca' is incorrect, as the same characters must be together.
3.
    Input: s = "Aabb"
    Output: "bbAa"
    Explanation: 'bbaA' is also a valid answer, but 'Aabb' is incorrect. Note that 'A' and 'a' are treated as two different characters.
'''

''' CONSTRAINTS
    1 <= s.length <= 5*10^5
    s consists of uppercase and lower case English letters and digits
'''

''' IDEA 
    
'''
from collections import Counter
from heapq import heapq, heapify, heappop
class Solution:
    def frequencySort(self, s: str) -> str:
        # s = sorted(s)
        # # creat dict for character frequency
        # freq = {}

        # # iterate through string and increment frequency count
        # for char in s:
        #     if char in freq:
        #         freq[char] += 1
        #     else:
        #         freq[char] = 1

        # # create a string and concat each char the correct number of times...
        # my_list = []
        # for key, val in freq.items():
        #     my_list.append(key * val)

        # # list of sub strings and sort by len using lambda
        # answer = sorted(my_list, key=len, reverse=True)
        
        # return "".join(answer)  
        counter = Counter(s)
        pq = [(-freq, char) for char, freq in counter.items()]
        heapq.heapify(pq)
        result = ''
        while pq:
            freq, char = heapq.heappop(pq)
            result += char * -freq
        return result
    
# ------------------------------------------------------------------------------------
# 2/8/2024
# 279. Perfect Squares (https://leetcode.com/problems/perfect-squares/description/?envType=daily-question&envId=2024-02-08)
''' DIRECTIONS
    Given an integer n, return the least number of perfect square numbers that sum to n.

    A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, 1, 4, 9, 16 are perfect squares while
    3 and 11 are not.
'''

''' EXAMPLES
1.
    Input: n = 12
    Output: 3
    Explanation: 12 = 4 + 4 + 4
2.
    Input: n = 13
    Output: 2
    Explanation: 13 = 4 + 9
'''

''' CONSTRAINTS
    1 <= n <= 10^4
'''

''' IDEA 
    Got stuck and had to search up the solution.
    The method used is called Dynamic Programming. Dynamic programming is used whenever we see a recursive solution that has repeated calls for same inputs and want to optimize it. The
    idea is to store the results of subproblems so we do not have to re-compute them when needed later.

    1. In the code, dynamic programming is used when we find the minimum number of perfect squares that sum up to the given number n.

    2. Initialize a list dp of size n + 1 where each element is initialized to INT_MAX, except dp[0] which is set to 0 since it doesn't require any perfect squares to represent.

    3. Iterate from 1 to n to calculate the minimum number of perfect squares required for each number.

    4. Inner loop: For each number i, iterate over all perfect squares less than or equal to i to find the minimum numbner of perfect squares required.

    5. Update dp[i] with the minimum value found by comparing it with the current value of dp[i - j * j] + 1, where j * j represents the perfect square being considered.
'''

class Solution:
    def numSquares(self, n: int) -> int:
        # Time: O(n * sqrt(n))
        # Space: O(n)
        dp = [float('inf')] * (n + 1)
        dp[0] = 0

        for i in range(1, n + 1):
            min_val = float('inf')
            j = 1
            while j * j <= i:
                min_val = min(min_val, dp[i - j * j] + 1)
                j += 1
            dp[i] = min_val
        return dp[n]
    
# ------------------------------------------------------------------------------------
# 2/9/2024
# 368. Largest Divisible Subset (https://leetcode.com/problems/largest-divisible-subset/description/?envType=daily-question&envId=2024-02-09)
''' DIRECTIONS

'''

''' EXAMPLES
1.
    Input: 
    Output: 
    Explanation:
'''

''' CONSTRAINTS

'''

''' IDEA 

'''

# ------------------------------------------------------------------------------------
# 2/13/2024
# 2108. Find First Palindromic String in the Array (https://leetcode.com/problems/find-first-palindromic-string-in-the-array/description/?envType=daily-question&envId=2024-02-13)
''' DIRECTIONS
    Given an array of strings, words, return the first palindromic string in the array. If there is no such string, return an empty string "".

    A string is palindromic if it reads the same forward and backward.
'''

''' EXAMPLES
1.
    Input: words = ["abc", "car", "ada", "racecar", "cool"]
    Output: "ada"
    Explanation: The first string that is palindromic is "ada". Note that "racecar" is also palindromic, but it is not the first.
2.
    Input: words = ["notapalindrome", "racecar"]
    Output: "racecar"
    Explanation: The first ahnd only string that is palindromic is "racecar".
3.
    Input: words = ["def", "ghi"]
    Output: ""
    Explanation: There are no palindromic strings, so the empty string is returned
'''

''' CONSTRAINTS
    1 <= words.length <= 100
    1 <= words[i].length <= 100
    words[i] consists only of lowercase English letters
'''

''' IDEA 
    Iterate through each word in the array. Check if the reverse version of the string is the same as the regular. If it is, return the string. If not, return empty string.
'''

class Solution:
    def firstPalindrome(self, words: List[str]) -> str:
        # Time: O(n) (n is the length of words array)
        # Space: O(1)
        for string in words:
            if string == string[::-1]:
                return string
        return ""

# ------------------------------------------------------------------------------------
# 2/13/2024
# 1481. Least Number of of Unique Integers after K Removals (https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/description/?envType=daily-question&envId=2024-02-16)
''' DIRECTIONS
    
'''

''' EXAMPLES
1.
    Input: 
    Output: 
    Explanation: 

'''

''' CONSTRAINTS
    
'''

''' IDEA 
    
'''