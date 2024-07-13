import { OrderItem } from './order_item';

export class Order {
	private total: number = 0;

	constructor(
		private readonly id: string,
		private readonly customerId: string,
		private items: OrderItem[],
	) {
		this.validate();

		this.updateTotal();
	}

	get Id() {
		return this.id;
	}

	get Total() {
		return this.total;
	}

	get CustomerId() {
		return this.customerId;
	}

	get Items() {
		return this.items;
	}

	addItems(items: OrderItem[]) {
		this.items = this.items.concat(items);
		this.updateTotal();
	}

	private updateTotal() {
		this.total = this.items.reduce(
			(acc, orderItem) => acc + orderItem.Total,
			0,
		);
	}

	private validate() {
		if (!this.id) {
			throw new Error('Order must have an id');
		}

		if (!this.customerId) {
			throw new Error('Order must have a customerId');
		}

		if (!this.items || this.items.length === 0) {
			throw new Error('Order must have at least one OrderItem');
		}
	}
}
