import { test } from 'ava';
import { Buffer } from 'core/buffer';
import { TextObjWord } from 'core/textobj';

test('TextObjWord::apply apply a new selection', t => {
  let buffer = Buffer.fromText("AB CD EF G\nHI JK LM N\nOP QR ST U\nVW XY Z");
  let textobj = new TextObjWord({ inner: true });
  let selection = textobj.find(buffer, buffer.selection);
  t.is(selection.begin.row, 0);
  t.is(selection.begin.col, 0);
  t.is(selection.end.row, 0);
  t.is(selection.end.col, 1);

  textobj = new TextObjWord({ inner: false });
  selection = textobj.find(buffer, buffer.selection);
  t.is(selection.begin.row, 0);
  t.is(selection.begin.col, 0);
  t.is(selection.end.row, 0);
  t.is(selection.end.col, 2);
});
