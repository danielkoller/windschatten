import { expect, test } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the landing page
    await page.goto('https://windschatten.fly.dev/');
  });

  test('should display Home button', async ({ page }) => {
    const homeButton = await page.$("text='Home'");
    expect(homeButton).toBeTruthy();
  });

  test('should display Registration button', async ({ page }) => {
    const registrationButton = await page.$("text='Registration'");
    expect(registrationButton).toBeTruthy();
  });

  test('should display Login button', async ({ page }) => {
    const loginButton = await page.$("text='Login'");
    expect(loginButton).toBeTruthy();
  });

  test('should navigate to Registration page', async ({ page }) => {
    await page.click('a.btn.btn-ghost[href="/registration"]');
    await page.waitForSelector('#username'); // Wait for an element specific to the Registration page
    expect(page.url()).toContain('/registration');
  });

  test('should navigate to Login page', async ({ page }) => {
    await page.click('a.btn.btn-ghost[href="/login"]');
    await page.waitForSelector('#username'); // Wait for an element specific to the Login page
    expect(page.url()).toContain('/login');
  });
});
