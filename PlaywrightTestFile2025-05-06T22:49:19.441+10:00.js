```javascript
import { test, expect } from '@playwright/test';

test.describe('Payment Gateway - Technical Details', () => {
  test('should display the title "Technical Details"', async ({ page }) => {
    await page.goto('URL_OF_YOUR_PAYMENT_GATEWAY'); // replace with your actual URL
    const title = await page.locator('selector_for_title'); // replace with the actual selector
    await expect(title).toHaveText('Technical Details');
  });

  test('should display the paragraph with text "System: Payment Gateway"', async ({ page }) => {
    await page.goto('URL_OF_YOUR_PAYMENT_GATEWAY'); // replace with your actual URL
    const paragraph = await page.locator('selector_for_paragraph'); // replace with the actual selector
    await expect(paragraph).toHaveText('System: Payment Gateway');
  });
});
```