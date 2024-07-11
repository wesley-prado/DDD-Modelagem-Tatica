import { Address, Customer } from '../../domain/entity';
import { CustomerRepositoryInterface } from '../../domain/repository';
import { CustomerModel, AddressColumns } from '../db/sequelize/model';

export class CustomerRepository implements CustomerRepositoryInterface {
	async create(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.Id,
			name: entity.Name,
			...this.extractAddress(entity.Address),
		});
	}

	async update(entity: Customer): Promise<void> {
		await CustomerModel.update(
			{ name: entity.Name, ...this.extractAddress(entity.Address) },
			{ where: { id: entity.Id } },
		);
	}

	async findById(id: string): Promise<Customer | null> {
		const customerModel = await CustomerModel.findOne({ where: { id } });

		if (!customerModel) return null;

		const customer = new Customer(customerModel.id, customerModel.name);
		customer.Address = new Address(
			customerModel.street,
			customerModel.number,
			customerModel.city,
			customerModel.state,
			customerModel.zipCode,
		);

		return customer;
	}

	async findAll(): Promise<Customer[]> {
		const Customers = await CustomerModel.findAll();

		return Customers.map(
			(Customer) =>
				new Customer(Customer.id, Customer.name, Customer.price),
		);
	}

	private extractAddress(address: Address): AddressColumns {
		return {
			street: address.Street,
			number: address.Number,
			city: address.City,
			state: address.State,
			zipCode: address.ZipCode,
		};
	}
}
