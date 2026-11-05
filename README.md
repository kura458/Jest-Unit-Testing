\# Advanced Jest Unit Testing – Practical Laboratory



\*\*Course:\*\* Software Component Development / Jest Unit Testing  

\*\*Project:\*\* University Testing Lab  

\*\*Repository:\*\* \[Jest Unit Testing – Group 4](https://github.com/kura458/Jest-Unit-Testing-Group4)



\## 1. Project Overview



This project implements and tests university student-management scenarios using \*\*Jest\*\*, a JavaScript testing framework.



The laboratory covers unit testing, input validation, stateful classes, array processing, mocking, lifecycle hooks, data-driven testing, code coverage, regression testing, and mutation testing.



The objective is to improve software quality by identifying defects, validating expected behavior, measuring test coverage, and evaluating the effectiveness of test cases.



\## 2. Technologies Used



\- JavaScript (ES Modules)

\- Node.js

\- npm

\- Jest 30.5.2

\- Stryker Mutator

\- HTML and LCOV coverage reports

\- Git and GitHub



\## 3. Project Structure



```text

Jest-Unit-Testing/

│

├── src/

│   ├── admission.js

│   ├── applicationCategory.js

│   ├── calculator.js

│   ├── eligibility.js

│   ├── eligibilityMutants.js

│   ├── enrollment.js

│   ├── fakeDatabase.js

│   ├── grading.js

│   ├── payment.js

│   ├── registration.js

│   ├── resultProcessor.js

│   ├── scholarship.js

│   ├── studentRepository.js

│   └── tuition.js

│

├── tests/

│   ├── coverage/

│   ├── data-driven/

│   ├── fixtures/

│   ├── lifecycle/

│   ├── unit/

│   └── calculator.test.js

│

├── Q2-Submission/

│   ├── grading.js

│   └── grading.test.js

│

├── reports/

│   ├── Q1-defect-log.md

│   ├── Q5-order-dependency-evidence.txt

│   ├── Q12-scholarship-mutation-report/

│   ├── Q13-mutant-analysis.md

│   ├── Q14-initial-mutation-report/

│   ├── Q14-improved-mutation-report/

│   └── Q14-mutation-analysis.md

│

├── Q2-Jest-Tests.png

├── Q2-Stryker-100-Percent.png

├── jest.config.js

├── package.json

├── package-lock.json

└── stryker.config.mjs

```



\## 4. Laboratory Questions



| Question | Topic | Main testing techniques |

|---|---|---|

| Q1 | Student Registration and Validation | Input validation, defect logging, equality |

| Q2 | Student Gradebook | Stateful classes, boundaries, instance isolation |

| Q3 | Tuition Fee Calculation | Array processing, rounding, immutability |

| Q4 | Enrollment Management | Jest mocks, duplicate prevention, rollback |

| Q5 | Student Repository | Test isolation, fixtures, test-order dependency |

| Q6 | Lifecycle Hooks | beforeAll, beforeEach, afterEach, afterAll |

| Q7 | Scholarship Eligibility | Decision tables, test.each() |

| Q8 | Tuition Payment | describe.each(), test.each(), fee combinations |

| Q9 | Student Result Processing | Data-driven tests, input validation |

| Q10 | Admission Coverage | Branch coverage, boundary testing |

| Q11 | Coverage Thresholds | Regression testing, global coverage thresholds |

| Q12 | Scholarship Mutation Testing | First-order mutation testing with Stryker |

| Q13 | Higher-Order Mutant Investigation | FOM, SOM, TOM |

| Q14 | Mutation Score Improvement | Mutation analysis, targeted tests, score comparison |



\## 5. Installation and Setup



Clone the repository:



```bash

git clone https://github.com/kura458/Jest-Unit-Testing-Group4.git

```



Navigate to the project:



```bash

cd Jest-Unit-Testing-Group4

```



Install dependencies:



```bash

npm install

```



\## 6. Running the Tests



Run the main Jest test suite:



```bash

npm test

```



Run an individual test file:



```bash

npm test -- --runTestsByPath tests/unit/grading.test.js

```



Run the standalone Q2 submission tests:



```bash

node --experimental-vm-modules ./node\_modules/jest/bin/jest.js --runInBand --testPathIgnorePatterns="/node\_modules/|stryker-tmp|reports" --runTestsByPath Q2-Submission/grading.test.js

```



The Q2 submission directory is excluded from the normal Jest discovery configuration, so its tests are run separately.



\## 7. Code Coverage



Generate coverage reports:



```bash

npm run test:coverage

```



Open the HTML coverage report:



```bash

start coverage\\lcov-report\\index.html

```



The project uses the V8 coverage provider and generates text, HTML, and LCOV reports.



\### Configured global coverage thresholds



| Metric | Required |

|---|---:|

| Statements | 90% |

| Branches | 85% |

| Functions | 90% |

| Lines | 90% |



\### Verified project-wide coverage



| Metric | Achieved |

|---|---:|

| Statements | 98.04% |

| Branches | 94.24% |

| Functions | 100% |

| Lines | 98.04% |



All four configured global coverage thresholds passed.



\## 8. Mutation Testing



Run StrykerJS:



```bash

npm run test:mutation

```



Mutation testing evaluates the effectiveness of the test suite by introducing controlled changes to source code and checking whether the tests detect them.



The project includes mutation-testing evidence for:



\- Q12: Scholarship eligibility rules.

\- Q13: First-order and higher-order eligibility mutants.

\- Q14: Payment calculation and mutation score improvement.



Mutation reports and analysis documents are stored in the `reports/` directory.



\## 9. Verified Test Results



The main project test suite was executed successfully.



| Result | Count |

|---|---:|

| Test suites passed | 13 |

| Total test suites | 13 |

| Tests passed | 297 |

| Total tests | 297 |

| Failed tests | 0 |



The standalone Q2 submission was also executed independently:



| Result | Count |

|---|---:|

| Test suites passed | 1 |

| Tests passed | 22 |

| Failed tests | 0 |



The Q2 tests are separate from the 297 main-suite tests.



\## 10. GitHub Repository



Source code, tests, and tracked laboratory evidence are maintained in GitHub.



Repository:



https://github.com/kura458/Jest-Unit-Testing-Group4



\## 11. Conclusion



This laboratory demonstrates practical application of automated testing techniques using Jest and StrykerJS.



The project covers functional correctness, input validation, state management, test isolation, lifecycle management, code coverage, regression testing, and mutation testing.



The verified main test suite achieved 297 passing tests across 13 test suites, with all configured global coverage thresholds satisfied.



These practices help improve software reliability, maintainability, and confidence in application behavior.



