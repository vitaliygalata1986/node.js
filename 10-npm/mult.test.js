const mult = require('./mult');

test('should multiply 5 and 10 and return 50', () => {
  expect(mult(5, 10)).toBe(50);
});

/*

test(name, callback) принимает 2 аргумента:
name — строка с описанием теста.
callback — функция, внутри которой выполняется проверка.
expect(value) принимает фактическое значение, которое хотим проверить.
.toBe(expected) принимает ожидаемое значение и проверяет строгое равенство, примерно как ===.
test('mult works', () => {
  expect(mult(5, 10)).toBe(50);
});

Здесь:

mult(5, 10) → фактический результат
50 → ожидаемый результат
*/
