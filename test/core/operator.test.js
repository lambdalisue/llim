import { test } from 'ava';
import { Buffer } from 'core/buffer';
import { TextObjWord } from 'core/textobj';
import { OperatorSelect } from 'core/operator';

test('TextObjWord::apply apply a new selection', t => {
  let buffer = Buffer.fromText("AB CD EF G\nHI JK LM N\nOP QR ST U\nVW XY Z");
  let textobj = new TextObjWord({ inner: true });
  let operator = new OperatorSelect({ repeat: 1 });

  operator.execute(buffer, textobj);
  t.is(buffer.selection.begin.row, 0);
  t.is(buffer.selection.begin.col, 0);
  t.is(buffer.selection.end.row, 0);
  t.is(buffer.selection.end.col, 1);

  textobj = new TextObjWord({ inner: false });
  operator.execute(buffer, textobj);
  t.is(buffer.selection.begin.row, 0);
  t.is(buffer.selection.begin.col, 0);
  t.is(buffer.selection.end.row, 0);
  t.is(buffer.selection.end.col, 2);
});

