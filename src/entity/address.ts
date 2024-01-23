export default class Address {
	private street: string;
	private number: string;
	private city: string;
	private state: string;
	private zipCode: string;

	constructor(
		street: string,
		number: string,
		city: string,
		state: string,
		zipCode: string
	) {
		this.street = street;
		this.number = number;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;

		this.validate();
	}

	private validate(): void {
		if (this.street.length < 3) {
			throw new Error("Street must be at least 3 characters long");
		}

		if (this.number.length < 1) {
			throw new Error("Number must be at least 1 character long");
		}

		if (this.city.length < 3) {
			throw new Error("City must be at least 3 characters long");
		}

		if (this.state.length < 2) {
			throw new Error("State must be at least 2 characters long");
		}

		if (this.zipCode.length < 8) {
			throw new Error("Zip Code must be at least 8 characters long");
		}
	}

	toString(): string {
		return `${this.street}, ${this.number} - ${this.city}/${this.state} - ${this.zipCode}`;
	}
}
