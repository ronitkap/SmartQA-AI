```javascript
import { test, expect } from '@playwright/test';

test.describe('Unreferenced Refund Error Handling', () => {

  test('should display specific error message when unreferenced refund role is not enabled', async ({ page }) => {
    // Simulate the condition where unreferenced refund role is not enabled
    await page.goto('/path-to-unreferenced-refund-endpoint');
    await page.click('button#process-refund'); // Adjust selector as necessary

    const errorMessage = await page.locator('div#error-message').textContent();
    expect(errorMessage).toBe('Unreferenced refund not allowed. Please reissue.');
  });

  test('should display specific error message when merchant account is not configured for unreferenced refunds', async ({ page }) => {
    // Simulate the condition where merchant account is not configured
    await page.goto('/path-to-unreferenced-refund-endpoint');
    await page.fill('input#payment-account-id', 'saved-account-id'); // Use the appropriate account ID
    await page.click('button#process-refund'); // Adjust selector as necessary

    const errorMessage = await page.locator('div#error-message').textContent();
    expect(errorMessage).toBe('Unreferenced refund not allowed. Please reissue.');
  });

  test('should return provider code "010 - Not Allowed" in the case of generic error', async ({ page }) => {
    // Trigger the condition for a generic error
    await page.goto('/path-to-unreferenced-refund-endpoint');
    await page.fill('input#payment-account-id', 'invalid-account-id'); // Invalid account ID to trigger generic error
    await page.click('button#process-refund'); // Adjust selector as necessary

    const propagatedErrorMessage = await page.locator('div#api-error-message').textContent();
    expect(propagatedErrorMessage).toContain('010 - Not Allowed');
    expect(propagatedErrorMessage).toContain('Not Allowed');
  });

});
```