import { Address } from './';

/**
 * Represents a Customer entity.
 */
export class Customer {
	private address!: Address;
	private active: boolean = false;

	constructor(
		private readonly id: string,
		private name: string,
	) {
		this.validate();
	}

	changeName(name: string): void {
		this.name = name;

		this.validate();
	}

	activate(): void {
		if (!this.address) {
			throw new Error('Address is required to activate a customer');
		}

		this.active = true;
	}

	deactivate(): void {
		this.active = false;
	}

	isActive(): boolean {
		return this.active;
	}

	get Name(): string {
		return this.name;
	}

	set Address(address: Address) {
		this.address = address;
	}

	private validate() {
		if (this.id.length === 0) {
			throw new Error('Id is required');
		}
		if (this.name.length < 2) {
			throw new Error('Name must be at least 2 characters long');
		}
	}
}
