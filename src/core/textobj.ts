import { Buffer } from './buffer';
import { Cursor, Selection } from './cursor';

export interface TextObjParams {
  inner: boolean;
}

export abstract class TextObj {
  constructor(public params: TextObjParams) {};

  abstract find(buffer: Buffer, selection?: Selection): Selection;
}

export class TextObjWord extends TextObj {
  find(buffer: Buffer, selection: Selection): Selection  {
    let cursor = selection.end;
    let line = buffer.getLine(cursor);
    let ncols = line.length;

    // Assign a begin cursor
    for(let col=cursor.col-1; col >= 0; col--) {
      let c = line[col];
      if (/\s/.exec(c)) {
        selection.begin = new Cursor(cursor.row, col-1);
        break;
      }
    }
    // Assign an end cursor
    for(let col=cursor.col+1; col < ncols; col++) {
      let c = line[col];
      if (/\s/.exec(c)) {
        selection.end = new Cursor(cursor.row, col-1);
        break;
      }
    }
    // Continue if 'inner' is not specified
    if (!this.params.inner) {
      for(let col=buffer.selection.end.col+1; col < ncols; col++) {
        let c = line[col];
        if (/\S/.exec(c)) {
          selection.end = new Cursor(cursor.row, col-1);
          break;
        }
      }
    }
    return selection;
  }
}

export class TextObjLine extends TextObj {
  find(buffer: Buffer, selection: Selection): Selection  {
    let cursor = selection.end;
    let line = buffer.getLine(cursor);
    let ncols = line.length;
    return new Selection(
      new Cursor(cursor.row, 0),
      new Cursor(cursor.row, ncols),
    );
  }
}

export function repeatTextObj(buffer: Buffer, textobj: TextObj, repeat: number): Selection {
  let selection = textobj.find(buffer, buffer.selection);
  let _selection = selection;
  while(repeat > 1) {
    _selection = textobj.find(buffer, _selection);
    repeat--;
  }
  selection.end = _selection.end;
  return selection
}
