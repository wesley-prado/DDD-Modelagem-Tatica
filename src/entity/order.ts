import { OrderItem } from './order_item';

export class Order {
	private readonly id: string;
	private customerId: string;
	private orderItems: OrderItem[];
	private total: number = 0;

	constructor(id: string, customerId: string, orderItems: OrderItem[]) {
		this.id = id;
		this.customerId = customerId;
		this.orderItems = orderItems;

		this.validate();

		this.total = this.calculateTotal();
	}

	getTotal() {
		return this.total;
	}

	getCustomerId() {
		return this.customerId;
	}

	getOrderItems() {
		return this.orderItems;
	}

	calculateTotal(): number {
		return this.orderItems.reduce(
			(acc, orderItem) => acc + orderItem.getTotal(),
			0,
		);
	}

	validate() {
		if (!this.id) {
			throw new Error('Order must have an id');
		}

		if (!this.customerId) {
			throw new Error('Order must have a customerId');
		}

		if (!this.orderItems || this.orderItems.length === 0) {
			throw new Error('Order must have at least one OrderItem');
		}
	}
}
