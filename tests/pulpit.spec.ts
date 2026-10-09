import {test, expect} from '@playwright/test';
test.describe('Pulpit tests', () => {
});

test('quick payment with correct data', async ({ page }) => { 
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  // wait for page to fully load:
  await page.waitForLoadState("domcontentloaded")

  await page.locator('#widget_1_transfer_receiver').selectOption('3');
  await page.locator('#widget_1_transfer_amount').fill('321');
  await page.locator('#widget_1_transfer_title').fill('kolacja');
  await page.getByRole('button', { name: 'wykonaj' }).click();
  await page.getByTestId('close-button').click();

  await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Michael Scott - 321,00PLN - kolacja');

});

test.only('quick payment without entering recipient details', async ({ page }) => { 
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  await page.locator('#widget_1_transfer_amount').fill('39');
  await page.locator('#widget_1_transfer_title').fill('przelew');
  await page.locator('#execute_btn').click();

  await expect(page.locator('#error_widget_1_transfer_receiver')).toHaveText('pole wymagane');

});








