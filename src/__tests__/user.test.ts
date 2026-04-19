describe('User Logic Test', () => {
  test('Should calculate correct total score', () => {
    const tech = 90;
    const func = 80;
    const ui = 70;
    const average = (tech + func + ui) / 3;
    expect(average).toBe(80);
  });
});