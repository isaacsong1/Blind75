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
    
'''

class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        pass