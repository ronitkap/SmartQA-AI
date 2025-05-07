```javascript
import { test, expect } from '@playwright/test';

test.describe('Unreferenced Refund Error Handling', () => {
  
  test('should display specific error message when unreferenced refund role is not enabled', async ({ page }) => {
    await page.goto('/refund'); // Update with actual URL

    // Assuming there's a function to trigger an unreferenced refund
    await triggerUnreferencedRefund(page, { roleEnabled: false });

    const errorMessage = await page.locator('.error-message').innerText(); // Update selector as needed
    expect(errorMessage).toBe('Unreferenced refund not allowed. Please reissue.');
  });

  test('should display specific error message when merchant account is not configured for unreferenced refunds', async ({ page }) => {
    await page.goto('/refund'); // Update with actual URL

    // Assuming there's a function to trigger an unreferenced refund
    await triggerUnreferencedRefund(page, { accountConfigured: false });

    const errorMessage = await page.locator('.error-message').innerText(); // Update selector as needed
    expect(errorMessage).toBe('Unreferenced refund not allowed. Please reissue.');
  });

  test('should contain generic error message for provider code 010 when conditions are not met', async ({ page }) => {
    await page.goto('/refund'); // Update with actual URL
    
    // Trigger conditions that lead to the generic error
    await triggerUnreferencedRefund(page, { roleEnabled: false, accountConfigured: false });

    const errorMessage = await page.locator('.error-message').innerText(); // Update selector as needed
    expect(errorMessage).toBe('Not Allowed.');
    const providerCode = await page.locator('.provider-code').innerText(); // Update selector as needed
    expect(providerCode).toBe('010');
  });

  test('should propagate the error message correctly through the API', async ({ request }) => {
    const response = await request.post('/api/refund', {
      data: { /* request payload */ }
    });

    expect(response.status()).toBe(403);
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Not Allowed.');
    expect(responseBody.providerCode).toBe('010');
  });

});

// Helper function (to be defined according to application's logic)
async function triggerUnreferencedRefund(page, options) {
  // Logic to trigger the unreferenced refund based on options provided
}
```