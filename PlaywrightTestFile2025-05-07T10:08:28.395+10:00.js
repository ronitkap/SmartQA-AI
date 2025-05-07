```javascript
import { test, expect } from '@playwright/test';

test.describe('Payment Gateway Technical Details', () => {
  
  test('should display the title', async ({ page }) => {
    await page.goto('URL_OF_THE_PAGE'); // Replace with the actual URL
    const title = await page.locator('h1'); // Update the selector based on your HTML
    await expect(title).toHaveText('Technical Details');
  });

  test('should display the correct paragraph', async ({ page }) => {
    await page.goto('URL_OF_THE_PAGE'); // Replace with the actual URL
    const paragraph = await page.locator('p'); // Update the selector based on your HTML
    await expect(paragraph).toHaveText('System: Payment Gateway');
  });

});
```