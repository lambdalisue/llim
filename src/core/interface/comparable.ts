export const enum ComparisonResult {
  Less    = -1,
  Equal   = +0,
  Greater = +1,
}

export interface Comparable {
  compare(other: Comparable): ComparisonResult;

  eq(other: Comparable): boolean;
  ne(other: Comparable): boolean;
  gt(other: Comparable): boolean;
  ge(other: Comparable): boolean;
  lt(other: Comparable): boolean;
  le(other: Comparable): boolean;
}

export abstract class AbstractComparable implements Comparable {
  abstract compare(other: Comparable): ComparisonResult;

  eq(other: Comparable): boolean {
    return this.compare(other) === ComparisonResult.Equal;
  }

  ne(other: Comparable): boolean {
    return !this.eq(other);
  }

  gt(other: Comparable): boolean {
    return this.compare(other) === ComparisonResult.Greater;
  }

  ge(other: Comparable): boolean {
    let result = this.compare(other);
    return result === ComparisonResult.Equal || result == ComparisonResult.Greater;
  }

  lt(other: Comparable): boolean {
    return this.compare(other) === ComparisonResult.Less;
  }

  le(other: Comparable): boolean {
    let result = this.compare(other);
    return result === ComparisonResult.Equal || result == ComparisonResult.Less;
  }
}
