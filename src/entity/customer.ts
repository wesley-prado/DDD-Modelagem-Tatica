import Address from "./address";

/**
 * Represents a Customer entity.
 */
export default class Customer {
	private readonly id: string;
	private name: string;
	private address!: Address;
	private active: boolean = false;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;

		this.validate();
	}

	changeName(name: string): void {
		this.name = name;

		this.validate();
	}

	setAddress(address: Address): void {
		this.address = address;
	}

	activate(): void {
		if (this.address === undefined) {
			throw new Error("Address is required to activate a customer");
		}

		this.active = true;
	}

	deactivate(): void {
		this.active = false;
	}

	private validate() {
		if (this.name.length < 3) {
			throw new Error("Name must be at least 3 characters long");
		}
	}
}
