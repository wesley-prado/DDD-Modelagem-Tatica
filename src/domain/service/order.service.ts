import { v4 as uuidv4 } from 'uuid';
import { Customer, Order, OrderItem } from '../entity';

export class OrderService {
	static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
		const order = new Order(uuidv4(), customer.Id, orderItems);

		const rewardPoints = order.getTotal() / 2;
		customer.addRewardPoints(rewardPoints);

		return order;
	}

	static getTotal(orders: Order[]) {
		return orders.reduce((acc, order) => acc + order.getTotal(), 0);
	}
}
