import { AbstractComparable, ComparisonResult } from './interface/comparable';


export class Cursor extends AbstractComparable {
  constructor(public row: number, public col: number) {
      super();  // 
  };

  compare(cursor: Cursor): ComparisonResult {
    let lrow = this.row;
    let lcol = this.col;
    let rrow = cursor.row;
    let rcol = cursor.col;
    if (lrow === rrow) {
      if (lcol === rcol) {
        return ComparisonResult.Equal;
      }
      return lcol > rcol ? ComparisonResult.Greater : ComparisonResult.Less;
    }
    return lrow > rrow ? ComparisonResult.Greater : ComparisonResult.Less;
  }
}

export class Selection {
  begin: Cursor;
  end: Cursor;

  constructor(begin?: Cursor, end?: Cursor) {
      this.begin = begin || new Cursor(0, 0);
      this.end = end || new Cursor(0, 0);
  }
}
