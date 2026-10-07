import {test, expect} from '@playwright/test';
test.describe('Pulpit tests', () => {
});

test.only('login with correct credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();
  //await page.locator('#uniform-widget_1_transfer_receiver').click();
  //await page.locator('#widget_1_transfer_receiver > option:nth-child(4)').click();





  await page.locator('#widget_1_transfer_receiver').selectOption('3');
  await page.locator('#widget_1_transfer_amount').click();
  await page.locator('#widget_1_transfer_amount').fill('321');
  await page.locator('#widget_1_transfer_title').click();
  await page.locator('#widget_1_transfer_title').fill('kolacja');
  await page.getByRole('button', { name: 'wykonaj' }).click();
  await page.getByTestId('close-button').click();



  await page.getByRole('button', { name: 'wykonaj' }).click();
  await page.getByTestId('close-button').click();
  await page.getByRole('link', { name: 'Przelew wykonany! Michael' }).click();
});
});
