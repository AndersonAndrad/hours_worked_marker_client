import { expect, test } from "@playwright/test";

test('Should be register a new project', async ({ page }) => {
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Projects' }).click();

  await page.getByRole('button', { name: 'List projects' }).click();

  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: ' New project' }).click();

  expect(page.getByText('Register project')).toBeVisible();

  expect(page.getByText('Register a new project with basic information.')).toBeVisible();

  await page.getByLabel('Project name').fill('automatation_project');

  await page.getByLabel('Price per hour').fill('50');

  await page.getByLabel('Expected hours per day').fill('5');

  await page.getByText('Save').click();

  await page.waitForLoadState('networkidle');

  // expect(page.getByText('automatation_project')).toBeVisible();

  // expect(page.getByText('R$ 50,00')).toBeVisible();

  // expect(page.getByText('5')).toBeVisible();
});
