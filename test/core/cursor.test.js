import { test } from 'ava';
import { Cursor, Selection } from 'core/cursor';

test('Cursor is comparable', t => {
  let cursor1 = new Cursor(0, 0);
  let cursor2 = new Cursor(0, 0);
  t.truthy(cursor1.eq(cursor2));

  cursor1 = new Cursor(0, 0);
  cursor2 = new Cursor(0, 1);
  t.truthy(cursor1.lt(cursor2));

  cursor1 = new Cursor(0, 1);
  cursor2 = new Cursor(0, 0);
  t.truthy(cursor1.gt(cursor2));

  cursor1 = new Cursor(0, 0);
  cursor2 = new Cursor(1, 0);
  t.truthy(cursor1.lt(cursor2));

  cursor1 = new Cursor(1, 0);
  cursor2 = new Cursor(0, 0);
  t.truthy(cursor1.gt(cursor2));
});

test('Selection constructor arguments are omittable', t => {
    let cursor = new Cursor(0, 0);
    let selection = new Selection();
    t.truthy(selection.begin.eq(cursor));
    t.truthy(selection.end.eq(cursor));

    let cursor1 = new Cursor(0, 1);
    let cursor2 = new Cursor(1, 0);
    selection = new Selection(cursor1, cursor2)
    t.truthy(selection.begin.eq(cursor1));
    t.truthy(selection.end.eq(cursor2));

    selection = new Selection(cursor1)
    t.truthy(selection.begin.eq(cursor1));
    t.truthy(selection.end.eq(cursor));
});
