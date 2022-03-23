import { useTypingChecker } from './index';

test('simple word correct typing', () => {
  const { checkTypingCorrectness } = useTypingChecker();

  const checkResult = checkTypingCorrectness('import', 'impo');
  expect(checkResult).toMatchObject({ isCorrect: true });
});

test('simple word wrong typing', () => {
  const { checkTypingCorrectness } = useTypingChecker();

  const checkResult = checkTypingCorrectness('import', 'impa');
  expect(checkResult).toEqual({ isCorrect: false, wrongPosition: 3 });
});

test('special symbols correct typing', () => {
  const { checkTypingCorrectness } = useTypingChecker();

  const checkResult = checkTypingCorrectness('!@#$%^&', '!@#$%^');
  expect(checkResult).toMatchObject({ isCorrect: true });
});

test('special symbols wrong typing', () => {
  const { checkTypingCorrectness } = useTypingChecker();

  const checkResult = checkTypingCorrectness('!@#$%^&', '!@#$%^*');
  expect(checkResult).toEqual({ isCorrect: false, wrongPosition: 6 });
});
