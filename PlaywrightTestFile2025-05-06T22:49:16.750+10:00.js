```javascript
import { test, expect } from '@playwright/test';

test.describe('Feature: Error formatting', () => {
  
  test('should display a formatted error message for payment gateway failure', async ({ page }) => {
    // Simulate triggering payment gateway failure
    await page.goto('/payment');
    await page.fill('#cardNumber', 'invalid-card-number');
    await page.click('#submitPayment');

    // Verify the error message is displayed
    const errorMessage = await page.locator('.error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('There was an error processing your payment. Please try again.');
  });

  test('should log error details when payment gateway fails', async ({ page }) => {
    // Simulate triggering payment gateway failure
    await page.goto('/payment');
    await page.fill('#cardNumber', 'invalid-card-number');
    await page.click('#submitPayment');

    // Verify error details in the console or logs
    const loggedError = await page.evaluate(() => window.errorLogs);
    expect(loggedError).toContain('Payment gateway error: Invalid card number');
  });

  test('should not display raw error messages to the user', async ({ page }) => {
    // Simulate triggering payment gateway failure
    await page.goto('/payment');
    await page.fill('#cardNumber', 'invalid-card-number');
    await page.click('#submitPayment');

    // Check that raw error does not appear in the UI
    const rawErrorMessage = await page.locator('.raw-error-message');
    await expect(rawErrorMessage).toHaveCount(0);
  });

});
```