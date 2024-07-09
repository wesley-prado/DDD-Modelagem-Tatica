import { Order, OrderItem } from '.';

describe('Order unit tests', () => {
	it('should sum the total of the order', () => {
		const order = new Order('any_id', 'any_customer_id', [
			new OrderItem('order_item_1', 'product_1', 100, 10),
			new OrderItem('order_item_2', 'product_2', 50, 5),
		]);

		expect(order.getTotal()).toBe(1250);
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

		expect(order.getCustomerId()).toBe('any_customer_id');
	});

	it('should return the orderItems', () => {
		const orderItems = [
			new OrderItem('order_item_1', 'product_1', 100, 10),
			new OrderItem('order_item_2', 'product_2', 50, 5),
		];

		const order = new Order('any_id', 'any_customer_id', orderItems);

		expect(order.getOrderItems()).toBe(orderItems);
	});

	it('should calculate the total of the order', () => {
		const order = new Order('any_id', 'any_customer_id', [
			new OrderItem('order_item_1', 'product_1', 100, 10),
			new OrderItem('order_item_2', 'product_2', 50, 5),
		]);

		expect(order.calculateTotal()).toBe(1250);
	});
});
