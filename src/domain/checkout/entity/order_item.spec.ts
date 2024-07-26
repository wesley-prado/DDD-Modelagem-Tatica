import OrderItem from './order_item';

describe('OrderItem unit tests', () => {
    it('should create an order item', () => {
        const orderItem = new OrderItem('any_id', 'any_productId', 1, 10);

        expect(orderItem).toBeDefined();
    });

    it('should return the total of the order item', () => {
        const orderItem = new OrderItem('any_id', 'any_productId', 2, 10);

        expect(orderItem.Total).toBe(20);
    });

    it('should return the product id of the order item', () => {
        const orderItem = new OrderItem('any_id', 'any_productId', 1, 10);

        expect(orderItem.ProductId).toBe('any_productId');
    });

    it('should return the quantity of the order item', () => {
        const orderItem = new OrderItem('any_id', 'any_productId', 1, 10);

        expect(orderItem.Quantity).toBe(1);
    });

    it('should return the price of the order item', () => {
        const orderItem = new OrderItem('any_id', 'any_productId', 1, 10);

        expect(orderItem.Price).toBe(10);
    });

    it('should throw an error when the quantity is less or equal zero', () => {
        expect(() => new OrderItem('any_id', 'any_productId', -1, 10)).toThrow(
            'quantity must be greater than 0',
        );
    });

    it('should throw an error when the price is less or equal zero', () => {
        expect(() => new OrderItem('any_id', 'any_productId', 1, -1)).toThrow(
            'price must be greater than 0',
        );
    });
});
