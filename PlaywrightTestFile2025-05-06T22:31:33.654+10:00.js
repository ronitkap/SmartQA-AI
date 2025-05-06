```javascript
import { test, expect } from '@playwright/test';

test.describe('Payment Gateway - Technical Details', () => {
  
  test('should display the title "Technical Details"', async ({ page }) => {
    await page.goto('/path-to-technical-details');  // Update with the actual URL
    const title = await page.locator('h1').innerText();  // Update with the actual selector for the title
    expect(title).toBe('Technical Details');
  });

  test('should display the paragraph "System: Payment Gateway"', async ({ page }) => {
    await page.goto('/path-to-technical-details');  // Update with the actual URL
    const paragraph = await page.locator('p').innerText();  // Update with the actual selector for the paragraph
    expect(paragraph).toBe('System: Payment Gateway');
  });
  
});
```