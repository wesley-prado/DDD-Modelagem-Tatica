import { Address, Customer } from '../../domain/entity';
import { CustomerRepositoryInterface } from '../../domain/repository';
import { CustomerModel } from '../db/sequelize/model';

export class CustomerRepository implements CustomerRepositoryInterface {
	async create(entity: Customer): Promise<void> {
		const model = this.createModelFromCustomer(entity);

		await CustomerModel.create({
			...model.dataValues,
		});
	}

	async update(entity: Customer): Promise<void> {
		const model = this.createModelFromCustomer(entity);

		await CustomerModel.update(model.dataValues, {
			where: { id: entity.Id },
		});
	}

	async findById(id: string): Promise<Customer | null> {
		const customerModel = await CustomerModel.findOne({ where: { id } });

		if (!customerModel) return null;

		return this.createCustomerFromModel(customerModel);
	}

	async findAll(): Promise<Customer[]> {
		const customerModels = await CustomerModel.findAll();

		return customerModels.map((customerModel) => {
			return this.createCustomerFromModel(customerModel);
		});
	}

	private createModelFromCustomer(customer: Customer): CustomerModel {
		return new CustomerModel({
			id: customer.Id,
			name: customer.Name,
			active: customer.IsActive,
			rewardPoints: customer.RewardPoints,
			street: customer.Address.Street,
			number: customer.Address.Number,
			city: customer.Address.City,
			state: customer.Address.State,
			zipCode: customer.Address.ZipCode,
		});
	}

	private createCustomerFromModel(customerModel: CustomerModel): Customer {
		const customer = new Customer(customerModel.id, customerModel.name);
		customer.changeAddress(
			new Address(
				customerModel.street,
				customerModel.number,
				customerModel.city,
				customerModel.state,
				customerModel.zipCode,
			),
		);
		customer.addRewardPoints(customerModel.rewardPoints);
		if (customerModel.active) customer.activate();

		return customer;
	}
}
