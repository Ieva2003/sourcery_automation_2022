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
//VARIABLES

var url_string = 'https://testsheepnz.github.io/BasicCalculator'; 

let selectBuild = '#selectBuild';
let numb1Field = '#number1Field';
let numb2Field = '#number2Field';
let operationDropdown = '#selectOperationDropdown';
let calculateButton = '#calculateButton';
let numberAnswerField = '#numberAnswerField';


//FUNCTIONS

async function visitPage(page) {
   await page.goto(url_string, {timeout: 10000});
};

async function calculate(page, version, number1, number2, operation)
{
  await visitPage(page);
  await page.selectOption(selectBuild, { label: version});
  await page.locator(numb1Field).type(number1);
  await page.locator(numb2Field).type(number2);
  await page.selectOption(operationDropdown, {label: operation});
  await page.locator(calculateButton).click();
} 

async function AssertErrorMessage (page) {
  await expect(page.locator('#errorMsgField')).not.toBeEmpty();
};


//TESTS

data.forEach(version => {
  test.describe(version + ': Add', () => {
    test('Adding 2 and 3 results in 5', async ({ page }) => {
      await calculate(page, version, '2', '3', 'Add');
      await expect(page.locator(numberAnswerField)).toHaveValue('5');
    });

    test('Adding 2.5 and 3 results in 5.5', async ({ page }) => {
      await calculate(page, version, '2.5', '3', 'Add');
      await expect(page.locator(numberAnswerField)).toHaveValue('5.5');
    });

    test('Adding 4 and k results in an error message', async ({ page }) => {
      await calculate(page, version, '4', 'k', 'Add');
      await AssertErrorMessage(page);
    });
  });
});

data.forEach(version => {
  test.describe(version + ': Concatenate', () => {
    test('Concatenating 2 and 3 results in 23', async ({ page }) => {
      await calculate(page, version, '2', '3', 'Concatinate');
      await expect(page.locator(numberAnswerField)).toHaveValue('23');
    });

    test('Concatenating 2.5 and 3 results in 2.53', async ({ page }) => {
      await calculate(page, version, '2.5', '3', 'Concatinate');
      await expect(page.locator(numberAnswerField)).toHaveValue('2.53');
    });

    test('Concatenating 4 and k results in 4k', async ({ page }) => {
      await calculate(page, version, '4', 'k', 'Concatinate');
      await expect(page.locator(numberAnswerField)).toHaveValue('4k');
    });
  });
});

data.forEach(version => {
  test.describe(version + ': Subtract', () => {
    test('Subtract 2 from 3 results in 1', async ({ page }) => {
      await calculate(page, version, '3', '2', 'Subtract');
      await expect(page.locator(numberAnswerField)).toHaveValue('1');
    });

    test('Subtract 2.5 from 3 results in 0.5', async ({ page }) => {
      await calculate(page, version, '3', '2.5', 'Subtract');
      await expect(page.locator(numberAnswerField)).toHaveValue('0.5');
    });

    test('Subtract 4 from k results in an error message', async ({ page }) => {
      await calculate(page, version, '4', 'k', 'Subtract');
      AssertErrorMessage (page);
    });
  });
});
data.forEach(version => {
  test.describe(version + ': Multiply', () => {
    test('Multiply 2 by 3 results in 6', async ({ page }) => {
      await calculate(page, version, '3', '2', 'Subtract');
      await expect(page.locator(numberAnswerField)).toHaveValue('6');
    });

    test('Multiply 2.5 by 3 results in 7.5', async ({ page }) => {
      await calculate(page, version, '2.5', '3', 'Multiply');
      await expect(page.locator(numberAnswerField)).toHaveValue('7.5');
    });

    test('Multiplying 4 by k results in an error message', async ({ page }) => {
      await calculate(page, version, '4', 'k', 'Multiply');
      AssertErrorMessage(page);
    });
  });
});
data.forEach(version => {
  test.describe(version + ': Divide', () => {
    test('Dividing 6 from 3 results in 2', async ({ page }) => {
      await calculate(page, version, '6', '3', 'Divide');
      await expect(page.locator(numberAnswerField)).toHaveValue('2');
    });

    test('Dividing 2 and blank should result in an error message', async ({ page }) => {
      await calculate(page, version, '2', '', 'Divide');
      AssertErrorMessage(page);
    });

    test('Dividing 6 from 4 results in 1.5', async ({ page }) => {
      await calculate(page, version, '6', '4', 'Divide');
      await expect(page.locator(numberAnswerField)).toHaveValue('1.5');
    });

    test('Dividing 4 from k results in an error message', async ({ page }) => {
      await calculate(page, version, '4', 'k', 'Divide');
      AssertErrorMessage(page);
    });
  });
});


data.forEach(version => {
  test.describe(version + ': Integer', () => {
    test('Integers only checkbox test', async ({ page }) => {
      await calculate(page, version, '3.7', '2.5', 'Add');

      let answer = await page.inputValue(numberAnswerField);
      expect(answer).toEqual('6.2');
      await page.locator('#integerSelect').click();

      answer = await page.inputValue(numberAnswerField);
      expect(answer).toEqual('6');
    });
  });
});


data.forEach(version => {
  test.describe(version + ': ClearButton', () => {
    test('Checking if clear button works', async ({ page }) => {
      await visitPage(page);
      await page.selectOption(selectBuild, { label: version});

      await page.locator('#clearButton').click();
      expect(page.locator('#clearButton')).toBeDisabled();
    });
  });
});