export class OrderItem {
	private readonly id: string;
	private productId: string;
	private quantity: number;
	private price: number;
	private total: number = 0;

	constructor(
		id: string,
		productId: string,
		quantity: number,
		price: number,
	) {
		this.id = id;
		this.productId = productId;
		this.quantity = quantity;
		this.price = price;
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
