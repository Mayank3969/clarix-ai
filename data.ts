
import { UserProfile, Topic, CommunityPost, TopicOverviewData, LearningModule, UserStats, Badge, DailyStat, TopicMisconceptionStat, AIAccuracyStat, FlaggedUser, ExperimentData } from "./types";

export const BADGES: Record<string, Badge> = {
    GRAPH_GOD: {
        id: "GRAPH_GOD",
        name: "Graph God",
        description: "Solved 50 Graph problems (Hard).",
        icon: "fa-diagram-project",
        color: "bg-purple-600"
    },
    STREAK_MASTER: {
        id: "STREAK_MASTER",
        name: "Streak Master",
        description: "Achieved a 30-day continuous streak.",
        icon: "fa-fire-flame-curved",
        color: "bg-orange-500"
    },
    CLEAN_CODER: {
        id: "CLEAN_CODER",
        name: "Clean Coder",
        description: "Maintained an average Style Score > 9.0 on last 20 posts.",
        icon: "fa-sparkles",
        color: "bg-emerald-500"
    }
};

export const MOCK_USER: UserProfile = {
  uid: "mock-user-123",
  email: "alex.dev@example.com",
  displayName: "Alex Dev",
  photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  eduLevel: "Undergraduate",
  targetRole: "SDE",
  preferredLanguage: "C++",
  reputation: 1250,
  expertise: "Expert",
  badges: [], // Initialize empty
  roles: ["admin"], // Granted admin role for dashboard access
};

export const MOCK_TOPICS: Topic[] = [
  { id: "arrays", title: "Arrays & Hashing", status: "Mastered", progress: 15, total: 15, icon: "fa-layer-group" },
  { id: "two-pointers", title: "Two Pointers", status: "Mastered", progress: 8, total: 10, icon: "fa-arrows-left-right" },
  { id: "linked-lists", title: "Linked Lists", status: "Weak", progress: 3, total: 12, icon: "fa-link" },
  { id: "trees", title: "Trees", status: "In Progress", progress: 5, total: 18, icon: "fa-network-wired" },
  { id: "dp", title: "Dynamic Programming", status: "Weak", progress: 2, total: 20, icon: "fa-cubes-stacked" },
  { id: "graphs", title: "Graphs", status: "In Progress", progress: 4, total: 15, icon: "fa-circle-nodes" },
];

// Topic-specific overviews with representative LeetCode problems
export const TOPIC_OVERVIEWS: Record<string, TopicOverviewData> = {
  arrays: {
    topicId: "arrays",
    title: "Arrays & Hashing",
    description: "Master constant-time lookups, prefix sums, and in-place tricks to tackle classic array problems.",
    difficulty: "Medium",
    commonMistakes: [
      "Forgetting to reset sliding window bounds correctly.",
      "Using O(n²) nested loops where a hashmap works in O(n).",
      "Mutating arrays while iterating without cloning or indexing carefully."
    ],
    algorithms: [
      { id: "arr-1", title: "Two Sum", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(n)", status: "Completed", url: "https://leetcode.com/problems/two-sum/" },
      { id: "arr-2", title: "Product of Array Except Self", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(1)", status: "Available", url: "https://leetcode.com/problems/product-of-array-except-self/" },
      { id: "arr-3", title: "Subarray Sum Equals K", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(n)", status: "Available", url: "https://leetcode.com/problems/subarray-sum-equals-k/" },
    ]
  },
  "two-pointers": {
    topicId: "two-pointers",
    title: "Two Pointers",
    description: "Use converging or expanding pointers to reduce complexity on sorted arrays and strings.",
    difficulty: "Medium",
    commonMistakes: [
      "Not moving both pointers correctly on duplicates.",
      "Forgetting that sorted order is required for many patterns.",
      "Mixing up window growth vs. shrink steps."
    ],
    algorithms: [
      { id: "tp-1", title: "Valid Palindrome", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(1)", status: "Completed", url: "https://leetcode.com/problems/valid-palindrome/" },
      { id: "tp-2", title: "3Sum", difficulty: "Medium", timeComplexity: "O(n^2)", spaceComplexity: "O(1)", status: "Available", url: "https://leetcode.com/problems/3sum/" },
      { id: "tp-3", title: "Container With Most Water", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(1)", status: "Available", url: "https://leetcode.com/problems/container-with-most-water/" },
    ]
  },
  "linked-lists": {
    topicId: "linked-lists",
    title: "Linked Lists",
    description: "Traverse and manipulate nodes efficiently with pointers, cycle detection, and splitting techniques.",
    difficulty: "Medium",
    commonMistakes: [
      "Not handling null pointers before dereferencing.",
      "Forgetting to break cycles when reversing or re-linking.",
      "Not updating both head and tail references on modifications."
    ],
    algorithms: [
      { id: "ll-1", title: "Reverse Linked List", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(1)", status: "Completed", url: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: "ll-2", title: "Linked List Cycle", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(1)", status: "Available", url: "https://leetcode.com/problems/linked-list-cycle/" },
      { id: "ll-3", title: "Merge Two Sorted Lists", difficulty: "Easy", timeComplexity: "O(n+m)", spaceComplexity: "O(1)", status: "Available", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    ]
  },
  trees: {
    topicId: "trees",
    title: "Trees",
    description: "Master traversals, recursion patterns, and BST properties for balanced tree manipulation.",
    difficulty: "Medium",
    commonMistakes: [
      "Incorrect base cases in recursive traversals.",
      "Mixing preorder/inorder/postorder outputs.",
      "Not handling null child pointers before access."
    ],
    algorithms: [
      { id: "tr-1", title: "Maximum Depth of Binary Tree", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(h)", status: "Completed", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { id: "tr-2", title: "Validate Binary Search Tree", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(h)", status: "Available", url: "https://leetcode.com/problems/validate-binary-search-tree/" },
      { id: "tr-3", title: "Lowest Common Ancestor of a BST", difficulty: "Medium", timeComplexity: "O(h)", spaceComplexity: "O(1)", status: "Available", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
    ]
  },
  dp: {
    topicId: "dp",
    title: "Dynamic Programming",
    description: "Break problems into subproblems, cache results, and optimize space for optimal substructure.",
    difficulty: "Hard",
    commonMistakes: [
      "Forgetting base cases in tabulation.",
      "Using incorrect state dimensions.",
      "Over-optimizing space before correctness."
    ],
    algorithms: [
      { id: "dp-1", title: "Climbing Stairs", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(1)", status: "Completed", url: "https://leetcode.com/problems/climbing-stairs/" },
      { id: "dp-2", title: "House Robber", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(1)", status: "Available", url: "https://leetcode.com/problems/house-robber/" },
      { id: "dp-3", title: "Coin Change", difficulty: "Medium", timeComplexity: "O(n*amount)", spaceComplexity: "O(amount)", status: "Available", url: "https://leetcode.com/problems/coin-change/" },
    ]
  },
  graphs: {
    topicId: "graphs",
    title: "Graphs",
    description: "Apply BFS/DFS, union-find, and shortest paths to navigate connectivity and traversal problems.",
    difficulty: "Medium",
    commonMistakes: [
      "Not marking visited nodes correctly, causing infinite loops.",
      "Forgetting to build an undirected graph with bidirectional edges.",
      "Using DFS where BFS is required for shortest path on unweighted graphs."
    ],
    algorithms: [
      { id: "gr-1", title: "Number of Islands", difficulty: "Medium", timeComplexity: "O(m*n)", spaceComplexity: "O(m*n)", status: "Completed", url: "https://leetcode.com/problems/number-of-islands/" },
      { id: "gr-2", title: "Course Schedule", difficulty: "Medium", timeComplexity: "O(V+E)", spaceComplexity: "O(V+E)", status: "Available", url: "https://leetcode.com/problems/course-schedule/" },
      { id: "gr-3", title: "Network Delay Time", difficulty: "Medium", timeComplexity: "O(E log V)", spaceComplexity: "O(V+E)", status: "Available", url: "https://leetcode.com/problems/network-delay-time/" },
    ]
  }
};

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "p1",
    topicId: "1",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      expertise: "Expert",
      roles: ["Topic Expert"],
      badges: ["GRAPH_GOD"]
    },
    title: "Optimized One-Pass Solution using HashMap",
    code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    language: "python",
    aiRelevance: 98,
    weightedScore: 142,
    timestamp: "2h ago",
    validationStatus: "VERIFIED",
    validationReason: "Logic is perfect and handles all standard cases correctly."
  },
  {
    id: "p2",
    topicId: "1",
    author: {
      name: "JuniorDev_99",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JD",
      expertise: "Beginner"
    },
    title: "My attempt using nested loops (Getting TLE?)",
    code: `for i in range(len(nums)):
    for j in range(len(nums)):
        if nums[i] + nums[j] == target:
            return [i, j]`,
    language: "python",
    aiRelevance: 45,
    weightedScore: -3,
    aiWarning: "Misconception: This solution uses the same element twice (when i == j). O(n²) complexity causes Time Limit Exceeded.",
    hasMisconception: true,
    misconceptionReason: "This solution fails to check if i != j, allowing the use of the same element twice. Additionally, O(n²) complexity is inefficient.",
    timestamp: "5h ago",
    validationStatus: "INCORRECT",
    validationReason: "Fails to prevent using the same element twice; causes TLE on large inputs."
  },
  {
    id: "p-user-1",
    topicId: "1",
    author: {
      name: "Alex Dev", // Matches MOCK_USER.displayName
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      expertise: "Expert",
      roles: ["Verified Helper"]
    },
    title: "Draft: Handling Edge Cases with Integers",
    code: `def twoSum(nums, target):
   # What if numbers are negative?
   pass`,
    language: "python",
    aiRelevance: 60,
    weightedScore: 1,
    aiWarning: "Solution is incomplete.",
    hasMisconception: true,
    misconceptionReason: "The code block is empty (pass) and does not implement any logic to handle negative integers or return a result.",
    timestamp: "Just now",
    validationStatus: "INCORRECT",
    validationReason: "Code body is empty; does not solve the problem."
  },
  {
    id: "p-weak-3",
    topicId: "3", // Linked Lists (Weak)
    author: {
      name: "LinkedListWizard",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LLW",
      expertise: "Expert",
      roles: ["Topic Expert"]
    },
    title: "The 'Fast and Slow' Pointer Pattern Explained",
    code: `def hasCycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    language: "python",
    aiRelevance: 95,
    weightedScore: 88,
    timestamp: "10h ago",
    validationStatus: "VERIFIED",
    validationReason: "Correct implementation of Floyd's Cycle Finding Algorithm."
  },
  {
    id: "p-weak-5",
    topicId: "5", // DP (Weak)
    author: {
      name: "DP_King",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DPK",
      expertise: "Intermediate",
      roles: ["Verified Helper"]
    },
    title: "Climbing Stairs - Memoization approach",
    code: `def climbStairs(n):
    memo = {1: 1, 2: 2}
    def helper(n):
        if n in memo: return memo[n]
        memo[n] = helper(n-1) + helper(n-2)
        return memo[n]
    return helper(n)`,
    language: "python",
    aiRelevance: 92,
    weightedScore: 45,
    timestamp: "1d ago",
    validationStatus: "PARTIAL",
    validationReason: "Logic is sound but may hit recursion depth limit for very large n."
  }
];

export const MOCK_LEARNING_PATH: LearningModule[] = [
  { topic: "Arrays & Hashing", difficulty: "Easy", reason: "Foundational knowledge required for SDE roles.", status: "Completed" },
  { topic: "Linked Lists", difficulty: "Medium", reason: "You struggled with pointer manipulation in recent attempts.", status: "Active" },
  { topic: "Dynamic Programming", difficulty: "Hard", reason: "Required to solve 20% of Google interview questions.", status: "Locked" },
  { topic: "System Design Basics", difficulty: "Medium", reason: "Essential for moving from Junior to Intermediate level.", status: "Locked" },
];

export const MOCK_USER_STATS: UserStats = {
  topicsLearned: 12,
  totalSolved: 342,
  totalAttempted: 410,
  accuracyRate: 83.4,
  weakAreas: ["Dynamic Programming", "Graphs"],
  streakDays: 30, // Updated to 30 to test Streak Master badge logic easily
  reputationHistory: [
    { date: "Jan", score: 850 },
    { date: "Feb", score: 920 },
    { date: "Mar", score: 1050 },
    { date: "Apr", score: 1150 },
    { date: "May", score: 1250 },
  ],
  skillRadar: [
    { subject: "Arrays", A: 120, fullMark: 150 },
    { subject: "Trees", A: 98, fullMark: 150 },
    { subject: "Graphs", A: 45, fullMark: 150 },
    { subject: "DP", A: 65, fullMark: 150 },
    { subject: "Greedy", A: 85, fullMark: 150 },
    { subject: "Strings", A: 110, fullMark: 150 },
  ]
};

// ADMIN DASHBOARD MOCK DATA
export const MOCK_DAILY_STATS: DailyStat[] = [
  { date: "Jan 1", activeUsers: 1200 },
  { date: "Jan 5", activeUsers: 1450 },
  { date: "Jan 10", activeUsers: 1300 },
  { date: "Jan 15", activeUsers: 1600 },
  { date: "Jan 20", activeUsers: 1850 },
  { date: "Jan 25", activeUsers: 2100 },
  { date: "Today", activeUsers: 2350 },
];

export const MOCK_TOPIC_MISCONCEPTIONS: TopicMisconceptionStat[] = [
  { topic: "Dynamic Programming", misleadingCount: 145 },
  { topic: "Graphs", misleadingCount: 98 },
  { topic: "Recursion", misleadingCount: 75 },
  { topic: "Bit Manipulation", misleadingCount: 62 },
  { topic: "Tries", misleadingCount: 40 },
];

export const MOCK_AI_ACCURACY: AIAccuracyStat[] = [
  { name: "High Relevance (>80%)", value: 65, color: "#10b981" },
  { name: "Medium Relevance", value: 25, color: "#f59e0b" },
  { name: "Low Relevance", value: 10, color: "#ef4444" },
];

export const MOCK_FLAGGED_USERS: FlaggedUser[] = [
  { id: "u-991", displayName: "Bot_User_2024", email: "bot24@tempmail.com", flagType: "Spam", severityScore: 0.95, status: "ShadowBanned" },
  { id: "u-402", displayName: "AngryDev", email: "angry@gmail.com", flagType: "Toxicity", severityScore: 0.88, status: "Active" },
  { id: "u-110", displayName: "CopyPasteKing", email: "cpking@yahoo.com", flagType: "Plagiarism", severityScore: 0.75, status: "Active" },
];

export const MOCK_EXPERIMENT_DATA: ExperimentData = {
  id: "tutor_methodology_v1",
  name: "Tutor Methodology V1",
  status: "Active",
  variants: [
    {
      id: "A",
      name: "Socratic Method",
      description: "Asks guiding questions before revealing code.",
      avgSessionTime: "12m 30s",
      avgSessionSeconds: 750,
      positiveFeedbackPercent: 85,
      nextProblemSuccessRate: 72,
      totalParticipants: 1240
    },
    {
      id: "B",
      name: "Direct Instruction",
      description: "Provides step-by-step explanations immediately.",
      avgSessionTime: "8m 45s",
      avgSessionSeconds: 525,
      positiveFeedbackPercent: 92,
      nextProblemSuccessRate: 68,
      totalParticipants: 1180
    }
  ]
};
