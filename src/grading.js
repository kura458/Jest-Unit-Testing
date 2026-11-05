
export class GradeBook {
  constructor(studentId) {
    this.studentId = studentId;
    this.scores = [];
  }

  // Add a score after validating it
  addScore(score) {
if (!Number.isFinite(score)) {
  throw new TypeError("Score must be a finite number");
}

    if (score < 0 || score > 100) {
      throw new RangeError("Score must be between 0 and 100");
    }

    this.scores.push(score);
  }

  // Calculate the average score
  getAverage() {
    if (this.scores.length === 0) {
      return 0;
    }

    const total = this.scores.reduce(
      (sum, score) => sum + score,
      0
    );

    return total / this.scores.length;
  }

  // Return the highest score, or null if empty
  getHighestScore() {
    if (this.scores.length === 0) {
      return null;
    }

    return Math.max(...this.scores);
  }

  // Remove and return one occurrence of the lowest score
  removeLowestScore() {
    if (this.scores.length === 0) {
      return null;
    }

    const lowestScore = Math.min(...this.scores);
    const lowestIndex = this.scores.indexOf(lowestScore);

    this.scores.splice(lowestIndex, 1);

    return lowestScore;
  }

  // A score of 50 or higher is passing
  static isPassing(average) {
    return average >= 50;
  }
}
