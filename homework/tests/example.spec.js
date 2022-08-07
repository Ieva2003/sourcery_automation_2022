// @ts-check
const { test, expect } = require('@playwright/test');

const data = [
  'Prototype',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]


data.forEach(version => {
  test.describe(version + ': Add', () => {
    test('Concatenating 2 and 3 results in 23', async ({ page }) => {
      visitPage(page);
      selectBuildVersion(page, data);
      await page.locator(numb1Field).type('2');
      await page.locator(numb2Field).type('3');
      selectOptionDropdown (page, 'Add');
      clickCalculateButton(page);
  
      await expect(page.locator(numberAnswerField)).toHaveValue('5');
    });
  });
});