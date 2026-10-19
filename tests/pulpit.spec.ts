import {test, expect} from '@playwright/test';
test.describe('Pulpit tests', () => {
});

//quick payment tests
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

test('quick payment without entering recipient details', async ({ page }) => { 
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  await page.locator('#widget_1_transfer_amount').fill('39');
  await page.locator('#widget_1_transfer_title').fill('przelew');
  await page.locator('#execute_btn').click();

  await expect(page.locator('#error_widget_1_transfer_receiver')).toHaveText('pole wymagane');

});

test('quick payment without entering amount', async ({ page }) => { 
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  await page.locator('#widget_1_transfer_receiver').selectOption('2');
  await page.locator('#widget_1_transfer_title').fill('przelew');
  await page.locator('#execute_btn').click();

  await expect(page.locator('#error_widget_1_transfer_amount')).toHaveText('pole wymagane');

});

test('quick payment without entering title', async ({ page }) => { 
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  await page.locator('#widget_1_transfer_receiver').selectOption('2');
  await page.locator('#widget_1_transfer_amount').fill('39');
  await page.locator('#execute_btn').click();

  await expect(page.locator('#error_widget_1_transfer_title')).toHaveText('pole wymagane');

});

// topup tests
test.only('phone top up with correct data', async ({ page }) => { 
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  //await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx'); //wybieram pełny tekst z atrybutu value
  await page.locator('#widget_1_topup_receiver').selectOption({index: 2}); //wybieram po indeksie
  await page.locator('#widget_1_topup_amount').fill('39');
  await page.locator('#uniform-widget_1_topup_agreement span').check(); //checkowanie checkboxa
  await page.locator('#execute_phone_btn').click();
  await page.getByTestId('close-button').click();

  await expect(page.getByTestId('message-text')).toHaveText('Doładowanie wykonane! 39,00PLN na numer 502 xxx xxx');

});

test('phone top up without selecting phone number', async ({ page }) => { 
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  await page.locator('#widget_1_topup_amount').fill('39');
  await page.locator('#uniform-widget_1_topup_agreement').check();
  await page.locator('#execute_phone_btn').click();

  await expect(page.getByTestId('error-widget-1-topup-receiver')).toHaveText('pole wymagane');

});

test('phone top up without entering amount', async ({page}) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  await page.locator('#widget_1_topup_receiver').selectOption({index:2});
  
  await page.locator('#uniform-widget_1_topup_agreement').check();
  await page.getByRole('button', { name: 'doładuj telefon' }).click();

  await expect(page.locator('#error_widget_1_topup_amount')).toHaveText('pole wymagane');
 
})