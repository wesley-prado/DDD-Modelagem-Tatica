import { Customer } from '../../domain/entity';
import { EventDispatcherInterface } from '../../domain/event/@shared';
import { CustomerCreatedEvent } from '../../domain/event/customer';
import { CustomerAddressChangedEvent } from '../../domain/event/customer/customer-address-changed.event';
import { CustomerRepositoryInterface } from '../../domain/repository/customer-repository.interface';

export class CustomerEventRepositoryDecorator
	implements CustomerRepositoryInterface
{
	constructor(
		private readonly repository: CustomerRepositoryInterface,
		private readonly eventDispatcher: EventDispatcherInterface,
	) {
		this.validate();
	}

	async create(customer: Customer): Promise<void> {
		await this.repository.create(customer);

		const customerCreatedEvent = new CustomerCreatedEvent({
			id: customer.Id,
			name: customer.Name,
		});

		this.eventDispatcher.notify(customerCreatedEvent);
	}

	async update(customer: Customer): Promise<void> {
		await this.repository.update(customer);

		const customerCreatedEvent = new CustomerAddressChangedEvent({
			id: customer.Id,
			name: customer.Name,
			address: customer.Address,
		});

		this.eventDispatcher.notify(customerCreatedEvent);
	}

	async findById(id: string): Promise<Customer> {
		return await this.repository.findById(id);
	}

	async findAll(): Promise<Customer[]> {
		return await this.repository.findAll();
	}

	private validate(): void {
		if (!this.repository) {
			throw new Error('Repository is required');
		}

		if (!this.eventDispatcher) {
			throw new Error('eventDispatcher is required');
		}
	}
}
