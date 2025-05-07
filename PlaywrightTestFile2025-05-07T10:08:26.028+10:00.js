```javascript
import { test, expect } from '@playwright/test';

test.describe('Error Formatting', () => {
    test('should display error message for failed payment attempt', async ({ page }) => {
        await page.goto('URL_OF_YOUR_PAYMENT_PAGE'); // Replace with the actual URL

        // Simulate a failed payment attempt
        await page.fill('#payment-info', 'INVALID_PAYMENT_INFO'); // Adjust selector and value as needed
        await page.click('#submit-payment'); // Adjust selector as needed

        // Check for the error message display
        const errorMessage = await page.locator('#error-message'); // Adjust selector as needed
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Payment processing error. Please try again.'); // Expected error message
    });

    test('should format error messages consistently', async ({ page }) => {
        await page.goto('URL_OF_YOUR_PAYMENT_PAGE'); // Replace with the actual URL

        // Simulate a payment error
        await page.fill('#payment-info', 'INVALID_PAYMENT_INFO'); // Adjust selector and value as needed
        await page.click('#submit-payment'); // Adjust selector as needed

        const errorMessage = await page.locator('#error-message'); // Adjust selector as needed
        await expect(errorMessage).toBeVisible();
        
        // Check if the error message has the correct format
        await expect(errorMessage).toHaveText(/Error: .* Please contact support./); // Adjust regex based on your formatting rules
    });

    test('should clear error message on new payment submission', async ({ page }) => {
        await page.goto('URL_OF_YOUR_PAYMENT_PAGE'); // Replace with the actual URL

        // Simulate a failed payment attempt
        await page.fill('#payment-info', 'INVALID_PAYMENT_INFO'); // Adjust selector and value as needed
        await page.click('#submit-payment'); // Adjust selector as needed

        const errorMessage = await page.locator('#error-message'); // Adjust selector as needed
        await expect(errorMessage).toBeVisible();

        // Simulate a new payment attempt
        await page.fill('#payment-info', 'VALID_PAYMENT_INFO'); // Adjust selector and value as needed
        await page.click('#submit-payment'); // Adjust selector as needed

        // Check that the error message has been cleared
        await expect(errorMessage).toBeHidden();
    });
});
```