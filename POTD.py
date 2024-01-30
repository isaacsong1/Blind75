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
    
'''

''' EXAMPLES

'''

''' CONSTRAINTS


'''

''' IDEA 

'''
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        pass