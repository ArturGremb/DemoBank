import { test, expect } from '@playwright/test';
test.describe('Pulpit tests', () => {});

// quick payment tests - podstawowy test
// test('quick payment with correct data', async ({ page }) => {
//   await page.goto('https://demo-bank.vercel.app/');
//   await page.getByTestId('login-input').fill('test1234');
//   await page.getByTestId('password-input').fill('Password');
//   await page.getByTestId('login-button').click();

//   // wait for page to fully load:
//   await page.waitForLoadState("domcontentloaded")

//   await page.locator('#widget_1_transfer_receiver').selectOption('3');
//   await page.locator('#widget_1_transfer_amount').fill('321');
//   await page.locator('#widget_1_transfer_title').fill('kolacja');
//   await page.getByRole('button', { name: 'wykonaj' }).click();
//   await page.getByTestId('close-button').click();

//   await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Michael Scott - 321,00PLN - kolacja');

// });


//quick payment tests - refaktoryzacja - dodanie zmiennych
test('quick payment with correct data', async ({ page }) => {
  //Arrange
  const baseURL = 'https://demo-bank.vercel.app/';
  const userId = 'test1234';
  const userPassword = 'Password';

  const reciverId = '3';
  const transferAmount = '321';
  const transferTitle = 'kolacja';

  //Act
  await page.goto(baseURL);
  await page.getByTestId('login-input').fill(userId);
  await page.getByTestId('password-input').fill(userPassword);
  await page.getByTestId('login-button').click();

  // wait for page to fully load:
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#widget_1_transfer_receiver').selectOption(reciverId);
  await page.locator('#widget_1_transfer_amount').fill(transferAmount);
  await page.locator('#widget_1_transfer_title').fill(transferTitle);
  await page.getByRole('button', { name: 'wykonaj' }).click();
  await page.getByTestId('close-button').click();

  //Assert
  await expect(page.locator('#show_messages')).toHaveText(
    `Przelew wykonany! Michael Scott - ${transferAmount},00PLN - ${transferTitle}`,
  ); //zamiast apostrofów można użyć backticków i wstawić zmienne w formacie ${nazwa_zmiennej}
});


test('quick payment without entering recipient details', async ({
  page,
}) => {
  //Arrange
  const baseURL = 'https://demo-bank.vercel.app/';
  const loginInput = 'login-input';
  const userId = 'test1234';
  const passwordInput = 'password-input';
  const userPassword = 'Password';
  const loginButton = 'login-button';
  const paymentAmount = '50';
  const paymentTitle = 'przelew';
  const executeButton = '#execute_btn';
  const transferReceiverErrorMessage = 'pole wymagane';
  const transferReceiverWidget = '#error_widget_1_transfer_receiver';

  //Act
  await page.goto(baseURL);
  await page.getByTestId(loginInput).fill(userId);
  await page.getByTestId(passwordInput).fill(userPassword);
  await page.getByTestId(loginButton).click();

  // wait for page to fully load:
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#widget_1_transfer_amount').fill(paymentAmount);
  await page.locator('#widget_1_transfer_title').fill(paymentTitle);
  await page.locator(executeButton).click();

  //Assert
  await expect(page.locator(transferReceiverWidget)).toHaveText(
    transferReceiverErrorMessage,
  );
});


test('quick payment without entering amount', async ({ page }) => {
  //Act
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

    // wait for page to fully load:
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#widget_1_transfer_receiver').selectOption('2');
  await page.locator('#widget_1_transfer_title').fill('przelew');
  await page.locator('#execute_btn').click();

  await expect(page.locator('#error_widget_1_transfer_amount')).toHaveText(
    'pole wymagane',
  );
});


test('quick payment without entering title', async ({ page }) => {

  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  // wait for page to fully load:
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#widget_1_transfer_receiver').selectOption('2');
  await page.locator('#widget_1_transfer_amount').fill('39');
  await page.locator('#execute_btn').click();

  await expect(page.locator('#error_widget_1_transfer_title')).toHaveText(
    'pole wymagane',
  );
});


// topup tests
test('phone top up with correct data', async ({ page }) => {
  //Arrange
  const baseURL = 'https://demo-bank.vercel.app/';
  const userId = 'test1234';
  const userPassword = 'Password';
  const loginButton = 'login-button';
  const topupReceiver = '502 xxx xxx'; //wybieram po indeksie, można też wybrać po value lub label
  const topupAmount = '39';

  //Act
  await page.goto(baseURL);
  await page.getByTestId('login-input').fill(userId);
  await page.getByTestId('password-input').fill(userPassword);
  await page.getByTestId(loginButton).click();

  // wait for page to fully load:
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#widget_1_topup_receiver').selectOption(topupReceiver); //wybieram pełny tekst z atrybutu value
  //await page.locator('#widget_1_topup_receiver').selectOption(topupReceiver); //wybieram po indeksie
  await page.locator('#widget_1_topup_amount').fill(topupAmount);
  await page.locator('#uniform-widget_1_topup_agreement span').check(); //checkowanie checkboxa
  await page.locator('#execute_phone_btn').click();
  await page.getByTestId('close-button').click();

  //Assert
  await expect(page.getByTestId('message-text')).toHaveText(
    `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`,
  );
});


test('phone top up without selecting phone number', async ({ page }) => {

  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  // wait for page to fully load:
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#widget_1_topup_amount').fill('39');
  await page.locator('#uniform-widget_1_topup_agreement').check();
  await page.locator('#execute_phone_btn').click();

  await expect(page.getByTestId('error-widget-1-topup-receiver')).toHaveText(
    'pole wymagane',
  );
});


test('phone top up without entering amount', async ({ page }) => {
  
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Password');
  await page.getByTestId('login-button').click();

  //wait for page to fully load:
  await page.waitForLoadState('domcontentloaded');

  await page.locator('#widget_1_topup_receiver').selectOption({ index: 2 });

  await page.locator('#uniform-widget_1_topup_agreement').check();
  await page.getByRole('button', { name: 'doładuj telefon' }).click();

  await expect(page.locator('#error_widget_1_topup_amount')).toHaveText(
    'pole wymagane',
  );
});
