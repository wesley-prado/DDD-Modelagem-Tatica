import { Address } from '.';

/**
 * Represents a Customer entity.
 */
export class Customer {
	private address!: Address;
	private active: boolean = false;
	private rewardPoints: number = 0;

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

	get IsActive(): boolean {
		return this.active;
	}

	get Id(): string {
		return this.id;
	}

	get Name(): string {
		return this.name;
	}

	changeAddress(address: Address) {
		this.address = address;
	}

	get Address(): Address {
		return this.address;
	}

	addRewardPoints(points: number): void {
		this.rewardPoints += points;
	}

	get RewardPoints(): number {
		return this.rewardPoints;
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
