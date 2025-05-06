```javascript
import { test, expect } from '@playwright/test';

test.describe('3.1 Feature: Error formatting', () => {
  test('should display error message for invalid payment', async ({ page }) => {
    await page.goto('https://your-application-url.com/payment');

    await page.fill('#payment-amount', 'invalid-amount');
    await page.click('#submit-payment');

    const errorMessage = await page.locator('#error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Please enter a valid amount');
  });

  test('should format error messages correctly', async ({ page }) => {
    await page.goto('https://your-application-url.com/payment');

    await page.fill('#payment-amount', '-100');
    await page.click('#submit-payment');

    const errorMessage = await page.locator('#error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Amount cannot be negative');
  });

  test('should reset the form upon successful re-submission', async ({ page }) => {
    await page.goto('https://your-application-url.com/payment');

    await page.fill('#payment-amount', '100');
    await page.click('#submit-payment');

    // Assuming the success message has CSS ID of '#success-message'
    const successMessage = await page.locator('#success-message');
    await expect(successMessage).toBeVisible();

    // Check if form inputs are reset
    const amountField = await page.locator('#payment-amount');
    await expect(amountField).toHaveValue('');
  });

  test('should not show error message after successful payment', async ({ page }) => {
    await page.goto('https://your-application-url.com/payment');

    await page.fill('#payment-amount', '100');
    await page.click('#submit-payment');

    const errorMessage = await page.locator('#error-message');
    await expect(errorMessage).toBeHidden();
  });
});
```