```javascript
import { test, expect } from '@playwright/test';

test.describe('Document Control', () => {
  
  test('should display status as WIP', async ({ page }) => {
    await page.goto('/document-control'); // replace with your actual URL
    const status = await page.textContent('selector-for-status'); // replace with actual selector
    expect(status).toBe('WIP');
  });

  test('should display correct links', async ({ page }) => {
    await page.goto('/document-control'); // replace with your actual URL
    
    const links = await page.locator('selector-for-links'); // replace with actual selector
    const expectedLinks = [
      'REF 2 - End to End solution design',
      'REF 1 - Payment Services',
      'Existing Contract: N/A'
    ];

    const linkTexts = [];
    for (let i = 0; i < await links.count(); i++) {
      linkTexts.push(await links.nth(i).textContent());
    }

    expect(linkTexts).toEqual(expectedLinks);
  });
  
});
```