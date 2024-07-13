export class OrderItem {
	private total: number = 0;

	constructor(
		private readonly id: string,
		private productId: string,
		private quantity: number,
		private price: number,
	) {
		this.validate();

		this.total = this.calculateTotal();
	}

	get Id() {
		return this.id;
	}

	get Total() {
		return this.total;
	}

	get ProductId() {
		return this.productId;
	}

	get Quantity() {
		return this.quantity;
	}

	get Price() {
		return this.price;
	}

	private validate() {
		if (this.quantity <= 0) {
			throw new Error('quantity must be greater than 0');
		}

		if (this.price <= 0) {
			throw new Error('price must be greater than 0');
		}
	}

	private calculateTotal(): number {
		return this.quantity * this.price;
	}
}
