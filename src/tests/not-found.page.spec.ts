import { expect, test } from "@playwright/test";

test('Should be navigate to not exists page return the message', async ({ page }) => {
  await page.goto('http://localhost:5173/not-exists-page', { waitUntil: 'networkidle' });

  const textNotExistPage = page.getByText('Sorry, page not found!');

  expect(textNotExistPage).toBeVisible();
});
