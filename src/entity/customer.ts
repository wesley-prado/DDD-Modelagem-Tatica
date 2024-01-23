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

	activate(): void {
		if (this.address === undefined) {
			throw new Error("Address is required to activate a customer");
		}

		this.active = true;
	}

	deactivate(): void {
		this.active = false;
	}

	get Id(): string {
		return this.id;
	}

	get Active(): boolean {
		return this.active;
	}

	set Address(address: Address) {
		this.address = address;
	}

	private validate() {
		if (this.name.length < 3) {
			throw new Error("Name must be at least 3 characters long");
		}
	}
}
