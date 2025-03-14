import { test, expect } from '@playwright/test';
import { LoginPage } from './../pages/LoginPage';

test('Login with invalid credential', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('incorrectUser','Password123');
  await expect(loginPage.errorMessage).toHaveText(`Your username is invalid!`);
});

test('Login with valid credential', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('student','Password123');
    
    // Verify new page URL contains 'practicetestautomation.com/logged-in-successfully/'
    await expect(page).toHaveURL(/.*practicetestautomation.com\/logged-in-successfully\//);

    // Verify new page contains the expected text ('Congratulations' or 'successfully logged in')
    await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
    await expect(page.getByText('Congratulations student. You')).toBeVisible();

    // Verify button 'Log out' is displayed on the new page
    const logoutButton = await page.getByRole('link', { name: 'Log out' });
    await expect(logoutButton).toBeVisible();
});

test('Negative password test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('student', 'incorrectPassword');
  
  // Verify error message is displayed
  await expect(loginPage.errorMessage).toBeVisible();
  
  // Verify error message text is 'Your password is invalid!'
  await expect(loginPage.errorMessage).toHaveText('Your password is invalid!');
});
