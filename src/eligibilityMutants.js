// FOM 1: Change age >= 18 to age > 18.
export function ageMutant(age, score, hasDocument) {
  if (age > 18 && score >= 60 && hasDocument) {
    return "Eligible";
  }

  return "Not Eligible";
}

// FOM 2: Change score >= 60 to score > 60.
export function scoreMutant(age, score, hasDocument) {
  if (age >= 18 && score > 60 && hasDocument) {
    return "Eligible";
  }

  return "Not Eligible";
}

// FOM 3: Change the first && operator to ||.
export function logicalMutant(age, score, hasDocument) {
  if (age >= 18 || score >= 60 && hasDocument) {
    return "Eligible";
  }

  return "Not Eligible";
}

// SOM: Combine the two relational changes.
export function secondOrderMutant(age, score, hasDocument) {
  if (age > 18 && score > 60 && hasDocument) {
    return "Eligible";
  }

  return "Not Eligible";
}

// TOM: Combine all three changes.
export function thirdOrderMutant(age, score, hasDocument) {
  if (age > 18 || score > 60 && hasDocument) {
    return "Eligible";
  }

  return "Not Eligible";
}