const USERNAME = '[data-testid="username-form"]';
const PASSWORD = '[data-testid="password-form"]';
const SAVE = '[data-testid="save-button"]';
const REGISTER_START = '[data-testid="register-start"]';
const REGISTER_DONE = '[data-testid="register-done"]'

describe('Create a new user', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('should display "Register" text on page', async () => {
    await page.waitForSelector(REGISTER_START);

    await expect(page).toMatch('Register');
  });

  it('should create new user and display "Register success!"', async () => {
    await expect(page).toFill(USERNAME, 'test-user');
    await expect(page).toFill(PASSWORD, '123456');

    await expect(page).toClick(SAVE);

    await page.waitForSelector(REGISTER_DONE);

    await expect(page).toMatch('Register success!');
  });
});
