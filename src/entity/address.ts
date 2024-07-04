/**
 * Represents an address Value Object (VO).
 */
export class Address {
	constructor(
		private readonly street: string,
		private readonly number: string,
		private readonly city: string,
		private readonly state: string,
		private readonly zipCode: string,
	) {
		this.validate();
	}

	private validate(): void {
		if (this.street.length < 3) {
			throw new Error('Street must be at least 3 characters long');
		}

		if (this.number.length < 1) {
			throw new Error('Number must be at least 1 character long');
		}

		if (this.city.length < 3) {
			throw new Error('City must be at least 3 characters long');
		}

		if (this.state.length < 2) {
			throw new Error('State must be at least 2 characters long');
		}

		if (this.zipCode.length < 8) {
			throw new Error('Zip Code must be at least 8 characters long');
		}
	}

	toString(): string {
		return `${this.street}, ${this.number} - ${this.city}/${this.state} - ${this.zipCode}`;
	}
}
