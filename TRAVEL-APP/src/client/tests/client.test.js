import { handleFormSubmit } from '../js/app.js';

describe('Client Test', () => {
  test('handleFormSubmit should be a function', () => {
    expect(typeof handleFormSubmit).toBe('function');
  });
});
