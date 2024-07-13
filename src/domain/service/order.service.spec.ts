import { Customer, Order, OrderItem } from '../entity';
import { OrderService } from '.';

describe('OrderService unit test', () => {
	it('should place an order', () => {
		const customer = new Customer('any_id', 'any_name');
		const orderItem = new OrderItem('any_id', 'any_product_id', 1, 10);

		const order: Order = OrderService.placeOrder(customer, [orderItem]);

		expect(customer.RewardPoints).toBe(5);
		expect(order.Total).toBe(10);
	});

	it('should get the total of all orders', () => {
		const orders = [
			new Order('any_id_0', 'customer_id_0', [
				new OrderItem('any_id_0', 'product_id_0', 5, 35),
				new OrderItem('any_id_1', 'product_id_1', 10, 20),
			]),
			new Order('any_id_1', 'customer_id_1', [
				new OrderItem('any_id_2', 'product_id_0', 3, 35),
				new OrderItem('any_id_3', 'product_id_2', 1, 200),
			]),
		];

		const result = OrderService.getTotal(orders);

		expect(result).toBe(5 * 35 + 10 * 20 + 3 * 35 + 200);
	});
});
