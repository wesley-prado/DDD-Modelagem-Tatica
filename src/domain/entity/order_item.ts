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

	getTotal() {
		return this.total;
	}

	getProductId() {
		return this.productId;
	}

	getQuantity() {
		return this.quantity;
	}

	getPrice() {
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
