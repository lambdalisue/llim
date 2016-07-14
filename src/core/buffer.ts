import { Cursor, Selection } from './cursor';

export class Buffer {
  newline: string;
  content: Array<string>;
  selection: Selection;

  constructor(content: Array<string> = [], newline = "\n") {
      this.content = content;
      this.newline = newline;
      this.selection = new Selection();
  }

  static fromText(text: string, newline = "\n") {
    let buffer = new Buffer(
        text.split(newline),
        newline,
    );
    return buffer;
  }

  getHeadCursor(): Cursor {
      return new Cursor(0, 0);
  }

  getTermCursor(): Cursor {
      if (this.content.length > 0) {
        return new Cursor(
            this.content.length - 1,
            this.content[this.content.length-1].length - 1,
        );
      } else {
          return this.getHeadCursor();
      }
  }

  getCurrentChar(): string {
      let cursor = this.selection.begin;
      let nrows = this.content.length;
      if (cursor.row >= nrows) {
          return '';
      }
      let ncols = this.content[cursor.row].length;
      if (cursor.col >= ncols) {
          return '';
      }
      return this.content[cursor.row][cursor.col];
  }

  getLine(cursor?: Cursor): string {
    cursor = cursor || this.selection.begin;
    if (cursor.row >= this.content.length) {
        return '';
    }
    return this.content[cursor.row];
  }
}
