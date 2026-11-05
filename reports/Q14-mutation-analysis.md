\# Q14: Mutation Score Improvement Project



\## 1. Objective



The objective was to evaluate the quality of the payment module's

Jest tests using StrykerJS mutation testing.



Stryker was configured to mutate only:



src/payment.js



The Jest runner was used with per-test coverage analysis.



\## 2. Initial Test Results



The initial payment test suite contained 4 tests.



All 4 tests passed before mutation testing.



Initial Stryker results:



| Metric | Count |

|---|---:|

| Total mutants | 26 |

| Killed | 22 |

| Timeout | 0 |

| Survived | 1 |

| No coverage | 3 |

| Errors | 0 |



\### Initial Mutation Score



Formula:



Mutation Score =

(Killed + Timeout) /

(Killed + Timeout + Survived + No Coverage) \* 100



Calculation:



(22 + 0) / (22 + 0 + 1 + 3) \* 100



Initial mutation score = 84.62%



\## 3. Classification of Initial Mutants



\### A. International Fee Logic



One mutant survived:



\- Original condition: if (isInternational)

\- Mutated condition: if (false)



The initial tests did not detect the removal of the

international fee condition because they did not test

international payments.



\### B. International Fee Arithmetic



Three mutants had no coverage:



1\. The international fee block was removed.

2\. The addition operator (+=) was changed to subtraction (-=).

3\. The multiplication operator (\*) was changed to division (/).



These mutants were not executed by the initial tests because

international payment scenarios were missing.



\### C. Payment-Method Errors



The unsupported payment method test detected the relevant

mutations in this area.



The initial test breakdown showed that this test killed

3 mutants. No payment-method error mutant remained

surviving or uncovered in the initial report.



\## 4. Test Improvements



Ten additional targeted Jest tests were added, increasing

the payment test suite from 4 to 14 tests.



The added tests covered:



1\. International card fee calculation.

2\. International bank fee calculation.

3\. International card fee with a smaller amount.

4\. International bank fee with a smaller amount.

5\. Domestic card payment without an international fee.

6\. Domestic bank payment without an international fee.

7\. Negative payment amount rejection.

8\. Zero amount rejection for international bank payment.

9\. Unsupported international payment method rejection.

10\. International card payment with a decimal amount.



All 14 payment tests passed.



\## 5. Improved Stryker Results



| Metric | Count |

|---|---:|

| Total mutants | 26 |

| Killed | 26 |

| Timeout | 0 |

| Survived | 0 |

| No coverage | 0 |

| Errors | 0 |



\### Improved Mutation Score



Calculation:



(26 + 0) / (26 + 0 + 0 + 0) \* 100



Improved mutation score = 100%



\## 6. Initial and Improved Comparison



| Metric | Initial | Improved |

|---|---:|---:|

| Total mutants | 26 | 26 |

| Killed | 22 | 26 |

| Survived | 1 | 0 |

| No coverage | 3 | 0 |

| Timeout | 0 | 0 |

| Errors | 0 | 0 |

| Mutation score | 84.62% | 100% |



The mutation score improved by 15.38 percentage points.



\## 7. Equivalent Mutant Justification



An equivalent mutant produces the same observable behavior

as the original program for all valid inputs.



No equivalent mutant was identified among the final results.

All 26 mutants were killed by the improved test suite.



A mutant with no coverage is not automatically equivalent.

It must first be exercised and evaluated before equivalence

can be justified.



\## 8. Report Files



Initial Stryker HTML report:



reports/Q14-initial-mutation-report/mutation.html



Improved Stryker HTML report:



reports/Q14-improved-mutation-report/mutation.html



\## 9. Final Project Verification



The complete Jest project test suite passed:



\- Test suites: 10 passed

\- Tests: 169 passed

\- Failed tests: 0



\## 10. Conclusion



The initial mutation score was 84.62%.



After adding ten targeted tests, the mutation score increased

to 100%.



The improved tests detected the international fee logic and

arithmetic defects that were previously surviving or

uncovered.



This demonstrates that targeted boundary and conditional

tests improve the ability of a test suite to detect defects.

