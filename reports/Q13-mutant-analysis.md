\# Q13: First-Order and Higher-Order Mutant Investigation



\## 1. Original Function



The original function checks three conditions:



\- Age must be at least 18.

\- Score must be at least 60.

\- The student must have a document.



All three conditions must be true to return "Eligible".



\## 2. Mutant Analysis Matrix



| Mutant | Killing Input (age, score, document) | Original Output | Mutant Output | Result |

|---|---|---|---|---|

| FOM 1: age >= 18 changed to age > 18 | (18, 60, true) | Eligible | Not Eligible | Killed |

| FOM 2: score >= 60 changed to score > 60 | (18, 60, true) | Eligible | Not Eligible | Killed |

| FOM 3: first \&\& changed to || | (18, 0, false) | Not Eligible | Eligible | Killed |

| SOM: both relational operators changed | (18, 60, true) | Eligible | Not Eligible | Killed |

| TOM: all three operators changed | (18, 60, true) | Eligible | Not Eligible | Killed |



\## 3. Explanation of Mutant Interactions



\### First-Order Mutants



\- FOM 1: The age boundary changes from 18 or above to strictly above 18. A student aged exactly 18 is incorrectly rejected.

\- FOM 2: The score boundary changes from 60 or above to strictly above 60. A score of exactly 60 is incorrectly rejected.

\- FOM 3: Changing the first AND operator to OR allows an eligible age to bypass the score and document conditions.



\### Higher-Order Mutants



\- SOM: Both relational operators become strict greater-than operators. A student meeting both exact thresholds is incorrectly rejected.

\- TOM: All three changes are combined. The OR operator allows age above 18 to bypass the score and document requirements, while the strict relational operators change the boundary behavior.



\## 4. Test Results



Test command:



npm test -- --runTestsByPath tests/unit/eligibility.test.js



Result:



\- Test suites: 1 passed

\- Tests: 12 passed

\- First-order mutants killed: 3

\- Second-order mutants killed: 1

\- Third-order mutants killed: 1

\- Total mutants killed: 5 out of 5



All mutant tests used valid inputs:

\- Age: integer from 0 to 120

\- Score: integer from 0 to 100

\- hasDocument: Boolean



\## 5. Conclusion



All five specified mutants were killed by the test cases.

The tests demonstrate that boundary-value inputs and logical-condition

interactions are important for detecting defects in eligibility decisions.

