export class OrderItem {
	private total: number = 0;

	constructor(
		private readonly id: string,
		private productId: string,
		private quantity: number,
		private price: number,
	) {
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

	private calculateTotal(): number {
		return this.quantity * this.price;
	}
}
