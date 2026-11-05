

\# Question 1: Student Registration Defect Log



\## 1. Before Correction



\- Total tests: 17

\- Passed: 10

\- Failed: 7



\## 2. Identified Defects



| ID | Input | Observed Defect | Resolution |

|---|---|---|---|

| D1 | Age 121 | Accepted invalid age | Enforced maximum age of 120 |

| D2 | Missing ID | Accepted missing ID | Added ID validation |

| D3 | ID 0 | Accepted invalid ID | Required positive ID |

| D4 | Unsafe integer ID | Accepted unsafe ID | Used Number.isSafeInteger() |

| D5 | Numeric name | Runtime trim error | Added name type validation |

| D6 | Age 18.5 | Accepted decimal age | Used Number.isInteger() |

| D7 | Numeric email | Runtime includes error | Added email type validation |



\## 3. After Correction



\- Total tests: 17

\- Passed: 17

\- Failed: 0



\## 4. Final Coverage



| Metric | Coverage |

|---|---:|

| Statements | 96.92% |

| Branches | 95.65% |

| Functions | 100% |

| Lines | 96.92% |



Uncovered lines: 9-10.



\## 5. Conclusion



The registration function was improved to validate

student IDs, names, ages, and email addresses.



The final implementation passed all 17 automated

tests and achieved 100% function coverage.



