```javascript
import { test, expect } from '@playwright/test';

test.describe('Adyen Payment Exception Handling', () => {
    
    test('should return appropriate message for refundWithData operation', async ({ request }) => {
        const response = await request.post('/adyen/endpoint', {
            data: {
                operation: 'refundWithData',
                // other required fields
            }
        });

        const responseBody = await response.json();
        expect(response.status()).toBe(422);
        expect(responseBody).toEqual({
            provider: 'Adyen',
            status: 422,
            operation: 'refundWithData',
            providerCode: '010',
            providerDescription: 'Not allowed',
            field: 'authorization',
            message: 'Unreferenced refunds are not permitted please re-issue as referenced refund',
            details: 'Invalid Data'
        });
    });

    test('should return default message for other operations', async ({ request }) => {
        const response = await request.post('/adyen/endpoint', {
            data: {
                operation: 'someOtherOperation',
                // other required fields
            }
        });

        const responseBody = await response.json();
        expect(response.status()).toBe(403);
        expect(responseBody).toEqual({
            provider: 'Adyen',
            status: 403,
            providerCode: '010',
            providerDescription: 'Not allowed',
            field: 'authorization',
            message: 'Not allowed',
            details: ''
        });
    });

});
```