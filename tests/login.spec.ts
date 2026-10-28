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
test('login with correct credentials', async ({ page }) => {
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
test('login field is empty', async ({ page }) => {
  //Arrange
  const baseURL = 'https://demo-bank.vercel.app/';
  const passwordField = 'password-input';
  const userPassword = 'Password';
  const loginField = 'login-input';
  const errorLoginId = 'error-login-id';
  const expectedLoginIdErrorMessasge = 'pole wymagane';

  //Act
  await page.goto(baseURL);
  await page.getByTestId(passwordField).click();
  await page.getByTestId(passwordField).fill(userPassword);
  await page.getByTestId(loginField).click();
  await page.getByTestId(loginField).blur(); // funkcja blur() na polu password służy do opuszczenia pola na którym w danej chwili jesteśmy
  await page.getByTestId(errorLoginId).click();

  //Assert
  await expect(page.getByTestId(errorLoginId)).toHaveText(expectedLoginIdErrorMessasge)
});

//walidacja pola login, wprowadzony login jest za krórki
test('entered login is too short', async ({ page }) => {

  //Arrange
  const baseURL = 'https://demo-bank.vercel.app/';
  const userLogin = 'test123';
  const passwordField = 'password-input';
  const errorLoginId = 'error-login-id';
  const expectedLoginIdErrorMessage = 'identyfikator ma min. 8 znaków';

  //Act
  await page.goto(baseURL);
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill(userLogin);
  await page.getByTestId(passwordField).click();

  //Assert
  await expect(page.getByTestId(errorLoginId)).toHaveText(
    expectedLoginIdErrorMessage,
  );
});

//walidacja pola hasło, pole hasło jest puste
test('login with empty password', async ({ page }) => {
  //Arrange
  const baseURL = 'https://demo-bank.vercel.app/';
  const userLogin = 'test1234';
  const passwordField = 'password-input';
  const errorLoginPassword = 'error-login-password';
  const loginPasswordErrorMessage = 'pole wymagane';

  //Act
  await page.goto(baseURL);
  //await page.getByTestId('login-input').click(); //tą linijkę mogę usunąć ponieważ poniższa funkcja fill wklika sie sama w pole
  await page.getByTestId('login-input').fill(userLogin);
  await page.getByTestId(passwordField).click();
  await page.getByTestId(passwordField).blur(); // odklikniecie

  //Assert
  await expect(page.getByTestId(errorLoginPassword)).toHaveText(
    loginPasswordErrorMessage,
  );
});

//walidacja pola hasło, pole hasło jest za krótkie
test('entered password is too short', async ({ page }) => {
  const baseURL = 'https://demo-bank.vercel.app/';
  const loginInput = 'login-input';
  const userId = 'test1234';
  const passwordInputField = 'password-input';
  const userPassword = 'Passwor';
  const loginButton = 'login-button';
  const errorLoginPassword = 'error-login-password';
  const loginPasswordErrorMessage = 'hasło ma min. 8 znaków';

  await page.goto(baseURL);
  //await page.getByTestId('login-input').click(); //tą linijkę mogę usunąć ponieważ poniższa funkcja fill wklika sie sama w pole
  await page.getByTestId(loginInput).fill(userId);
  //await page.getByTestId('password-input').click(); //tą linijkę mogę usunąć ponieważ poniższa funkcja fill wklika sie sama w pole
  await page.getByTestId(passwordInputField).fill(userPassword);
  await page.getByTestId(loginButton).click({ force: true }); //wymuszenie kliknięcia w nieaktywny przycisk

  await expect(page.getByTestId(errorLoginPassword)).toHaveText(
    loginPasswordErrorMessage,
  );
});

//walidacja przycisku 'zaloguj się'
test('login button to be enabled', async ({ page }) => {
  //Arrange
  const baseURL = 'https://demo-bank.vercel.app/';
  const userId = 'test1234';
  const passwordInputField = 'password-input';
  const userPassword = 'Password';
  const loginButton = 'login-button';

  //Act
  await page.goto(baseURL);
  await page.getByTestId('login-input').fill(userId);
  await page.getByTestId(passwordInputField).fill('Passwor')
  await page.getByTestId(loginButton).click({ force: true });
  await page.getByTestId(passwordInputField).fill(userPassword);

  //Assert
  await expect(page.getByTestId('login-button')).toBeEnabled;
});
