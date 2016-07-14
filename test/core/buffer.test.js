import { test } from 'ava';
import { Buffer } from 'core/buffer';
import { Cursor } from 'core/cursor';

test('Buffer.fromText() create a buffer instance from text', t => {
  let buffer = Buffer.fromText("ABCDEFG\nHIJKLMN\nOPQRSTU\nVWXYZ");
  t.is(buffer.newline, "\n");
  t.deepEqual(buffer.content, [
    "ABCDEFG",
    "HIJKLMN",
    "OPQRSTU",
    "VWXYZ",
  ]);
  let cursor = new Cursor(0, 0);
  t.truthy(buffer.selection.begin.eq(cursor));
  t.truthy(buffer.selection.end.eq(cursor));
});

test('Buffer::getHeadCursor() returns a head cursor', t => {
  let buffer = Buffer.fromText("ABCDEFG\nHIJKLMN\nOPQRSTU\nVWXYZ");
  let cursor = buffer.getHeadCursor();
  t.truthy(cursor.eq(new Cursor(0, 0)));
});

test('Buffer::getTermCursor() returns a terminal cursor', t => {
  let buffer = Buffer.fromText("ABCDEFG\nHIJKLMN\nOPQRSTU\nVWXYZ");
  let cursor = buffer.getTermCursor();
  t.truthy(cursor.eq(new Cursor(3, 4)));
});

test('Buffer::getCurrentChar() returns a char on a begin cursor', t => {
  let buffer = Buffer.fromText("ABCDEFG\nHIJKLMN\nOPQRSTU\nVWXYZ");
  t.is(buffer.getCurrentChar(), 'A');

  buffer.selection.begin.row = 1;
  t.is(buffer.getCurrentChar(), 'H');

  buffer.selection.begin.col = 1;
  t.is(buffer.getCurrentChar(), 'I');

  buffer.selection.begin.row = 4;
  buffer.selection.begin.col = 0;
  t.is(buffer.getCurrentChar(), '');

  buffer.selection.begin.row = 0;
  buffer.selection.begin.col = 7;
  t.is(buffer.getCurrentChar(), '');
});

test('Buffer::getLine() returns a line on a cursor', t => {
  let buffer = Buffer.fromText("ABCDEFG\nHIJKLMN\nOPQRSTU\nVWXYZ");
  t.is(buffer.getLine(), 'ABCDEFG');

  buffer.selection.begin.row = 1;
  t.is(buffer.getLine(), 'HIJKLMN');

  buffer.selection.begin.col = 1;
  t.is(buffer.getLine(), 'HIJKLMN');

  buffer.selection.begin.row = 4;
  t.is(buffer.getLine(), '');

  buffer.selection.begin.row = 0;
  buffer.selection.begin.col = 0;
  t.is(buffer.getLine(new Cursor(1, 0)), 'HIJKLMN');

  buffer.selection.begin.row = 0;
  buffer.selection.begin.col = 0;
  t.is(buffer.getLine(new Cursor(1, 1)), 'HIJKLMN');

  buffer.selection.begin.row = 0;
  buffer.selection.begin.col = 0;
  t.is(buffer.getLine(new Cursor(4, 0)), '');
});
