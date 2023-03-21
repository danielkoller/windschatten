import { expect, test } from '@playwright/test';

test('Login test', async ({ page }) => {
  // Go to your website's URL
  await page.goto('https://windschatten.fly.dev/');

  // Click on the login button to open the login form
  await page.click('text=Login');

  // Fill in the username and password fields
  await page.fill('#username', 'a');
  await page.fill('#password', 'a');

  // Click on the submit button to log in
  await Promise.all([
    page.waitForNavigation(),
    page.click('button.btn:text("Login")'),
  ]);

  // Verify that the user is logged in by checking for the presence of the username and logout button
  const loggedInUsername = await page.textContent(
    'a.btn.btn-ghost[href="/profile/a"]',
  );
  expect(loggedInUsername).toBe('a');

  const logoutButton = await page.textContent(
    'a.btn.btn-ghost[href="/logout"]',
  );
  expect(logoutButton).toBeTruthy();
});
