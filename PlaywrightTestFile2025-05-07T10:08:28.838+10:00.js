```javascript
// tests/handlePaymentException.spec.js

const { test, expect } = require('@playwright/test');

test.describe('Handle Payment Exception', () => {
    test('should return appropriate message for refundWithData operation', async ({ request }) => {
        const response = await request.post('/api/payment', {
            data: {
                operation: 'refundWithData',
                // other necessary payload data
            }
        });
        
        const data = await response.json();
        
        expect(data.status).toBe(422);
        expect(data.message).toBe('Unreferenced refunds are not permitted please re-issue as referenced refund');
    });

    test('should return default message for unsupported operation', async ({ request }) => {
        const response = await request.post('/api/payment', {
            data: {
                operation: 'unsupportedOperation',
                // other necessary payload data
            }
        });
        
        const data = await response.json();

        expect(data.status).toBe(403);
        expect(data.message).toBe('Not allowed');
    });
});
```