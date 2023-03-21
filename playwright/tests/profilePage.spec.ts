import { expect, Page, test } from '@playwright/test';

async function loginUser(page: Page) {
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
}

test.describe('ProfilePage', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    await page.goto('https://windschatten.fly.dev/profile/a');
  });

  test('displays the correct title and description', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe('Profile | Windschatten');

    const description = await page.getAttribute(
      'meta[name="description"]',
      'content',
    );
    expect(description).toBe(
      'This is the profile page of Windschatten. Here you can see the best route for you to take to work and home by bicycle. You can also see the posts of other users in your district and interact with them. So you will never ride alone again!',
    );
  });

  test('displays user connection section', async ({ page }) => {
    const userGroupIcon = await page.waitForSelector('.text-4xl.fa-user-group');
    expect(userGroupIcon).toBeTruthy();

    const userConnectHeader = await page.waitForSelector(
      'h3.text-lg.font-bold.my-4',
    );
    expect(userConnectHeader).toBeTruthy();

    const userTable = await page.waitForSelector('table.table.table-zebra');
    expect(userTable).toBeTruthy();
  });
});
