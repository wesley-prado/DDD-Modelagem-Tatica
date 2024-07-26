import Order from './order';
import OrderItem from './order_item';

describe('Order unit tests', () => {
    it('should sum the total of the order', () => {
        const order = new Order('any_id', 'any_customer_id', [
            new OrderItem('order_item_1', 'product_1', 100, 10),
            new OrderItem('order_item_2', 'product_2', 50, 5),
        ]);

        expect(order.Total).toBe(1250);
    });

    it('should throw an error if customerId is not provided', () => {
        expect(() => new Order('any_id', '', [])).toThrow(
            new Error('Order must have a customerId'),
        );
    });

    it('should throw an error if orderItems is empty', () => {
        expect(() => new Order('any_id', 'any_customer_id', [])).toThrow(
            new Error('Order must have at least one OrderItem'),
        );
    });

    it('should throw an error if id is not provided', () => {
        expect(() => new Order('', 'any_customer_id', [])).toThrow(
            new Error('Order must have an id'),
        );
    });

    it('should return the customerId', () => {
        const order = new Order('any_id', 'any_customer_id', [
            new OrderItem('order_item_1', 'product_1', 100, 10),
        ]);

        expect(order.CustomerId).toBe('any_customer_id');
    });

    it('should return the orderItems', () => {
        const orderItems = [
            new OrderItem('order_item_1', 'product_1', 100, 10),
            new OrderItem('order_item_2', 'product_2', 50, 5),
        ];

        const order = new Order('any_id', 'any_customer_id', orderItems);

        expect(order.Items).toBe(orderItems);
    });

    it('should add items to the order', () => {
        const orderItems = [
            new OrderItem('order_item_1', 'product_1', 100, 10),
            new OrderItem('order_item_2', 'product_2', 50, 5),
        ];

        const order = new Order('any_id', 'any_customer_id', orderItems);

        const newOrderItems = [
            new OrderItem('order_item_3', 'product_3', 50, 5),
            new OrderItem('order_item_4', 'product_4', 100, 10),
        ];

        order.addItems(newOrderItems);

        expect(order.Items).toEqual([...orderItems, ...newOrderItems]);
        expect(order.Total).toBe(100 * 10 * 2 + 50 * 5 * 2);
    });
});
