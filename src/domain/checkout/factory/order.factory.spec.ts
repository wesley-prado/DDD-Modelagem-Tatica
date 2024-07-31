import { v4 as uuid } from 'uuid';
import OrderFactory from './order.factory';

describe('Order factory unit test', () => {
    it('should create a new order', () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    price: 100,
                    productId: uuid(),
                    quantity: 2,
                },
            ],
        };

        const order = OrderFactory.create(orderProps);

        expect(order.Id).toBe(orderProps.id);
        expect(order.CustomerId).toBe(orderProps.customerId);
        expect(order.Items.length).toBe(1);
        for (const item of order.Items) {
            const propItem = orderProps.items[0];

            expect(item.Id).toBe(propItem.id);
            expect(item.Price).toBe(propItem.price);
            expect(item.ProductId).toBe(propItem.productId);
            expect(item.Quantity).toBe(propItem.quantity);
        }
    });
});
