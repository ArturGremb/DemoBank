import { test, expect } from '@playwright/test';

//poprawne logowanie - podstawowy test
// test('login with correct credentials', async ({ page }) => {
//   await page.goto('https://demo-bank.vercel.app/');
//   await page.getByTestId('login-input').fill('test1234');
//   await page.getByTestId('password-input').fill('Password');
//   await page.getByTestId('login-button').click();
//   await page.getByTestId('user-name').click();

//   await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
// });

//poprawne logowanie - refaktoryzacja - dodanie zmiennych
test.only('login with correct credentials', async ({ page }) => {
  //Arrange
  const baseURL = 'https://demo-bank.vercel.app/';
  const userId = 'test1234';
  const userPassword = 'Password';
  const expectedUserName = 'Jan Demobankowy';

  //Act
  await page.goto(baseURL);
  await page.getByTestId('login-input').fill(userId);
  await page.getByTestId('password-input').fill(userPassword);
  await page.getByTestId('login-button').click();

  //Assert
  await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
});

//walidacja pola login, pole login jest puste - podstawowy test
// test('login field is empty', async ({ page }) => {
//   await page.goto('https://demo-bank.vercel.app/');
//   await page.getByTestId('password-input').click();
//   await page.getByTestId('password-input').fill('Password');
//   await page.getByTestId('login-input').click();
//   await page.getByTestId('login-input').blur(); // funkcja blur() na polu password służy do opuszczenia pola na którym w danej chwili jesteśmy
//   await page.getByTestId('error-login-id').click();

//   await expect(page.getByTestId('error-login-id')).toHaveText('pole wymagane')
// });

//walidacja pola login, wprowadzony login jest za krórki
test('entered login is too short', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('test123');
  await page.getByTestId('password-input').click();

  await expect(page.getByTestId('error-login-id')).toHaveText(
    'identyfikator ma min. 8 znaków',
  );
});

//walidacja pola hasło, pole hasło jest puste
test('login with empty password', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  //await page.getByTestId('login-input').click(); //tą linijkę mogę usunąć ponieważ poniższa funkcja fill wklika sie sama w pole
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').blur();

  await expect(page.getByTestId('error-login-password')).toHaveText(
    'pole wymagane',
  );
});

//walidacja pola hasło, pole hasło jest za krótkie
test('entered password is too short', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  //await page.getByTestId('login-input').click(); //tą linijkę mogę usunąć ponieważ poniższa funkcja fill wklika sie sama w pole
  await page.getByTestId('login-input').fill('test1234');
  //await page.getByTestId('password-input').click(); //tą linijkę mogę usunąć ponieważ poniższa funkcja fill wklika sie sama w pole
  await page.getByTestId('password-input').fill('Passwor');
  await page.getByTestId('login-button').click({ force: true }); //wymuszenie kliknięcia w nieaktywny przycisk

  await expect(page.getByTestId('error-login-password')).toHaveText(
    'hasło ma min. 8 znaków',
  );
});

//walidacja przycisku 'zaloguj się'
test('login button to be enabled', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').fill('test1234');
  await page.getByTestId('password-input').fill('Passwor');
  await page.getByTestId('login-button').click({ force: true });
  await page.getByTestId('password-input').fill('Password');

  await expect(page.getByTestId('login-button')).toBeEnabled;
});
