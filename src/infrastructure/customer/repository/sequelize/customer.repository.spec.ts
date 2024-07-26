import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/vo/address';
import CustomerModel from './customer.model';
import CustomerRepository from './customer.repository';

type SUTWrapper = {
    sut: CustomerRepository;
};

const makeSUT = (): SUTWrapper => {
    const sut = new CustomerRepository();
    return { sut };
};

describe('CustomerRepository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
            models: [CustomerModel],
        });

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const { sut } = makeSUT();
        const customer = new Customer('1', 'Customer 1');
        customer.changeAddress(
            new Address('Street 1', '5123', 'City 1', 'State 1', '18075-000'),
        );
        customer.addRewardPoints(300);
        customer.activate();

        await sut.create(customer);

        const customerModel = await CustomerModel.findOne({
            where: { id: '1' },
        });
        expect(customerModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Customer 1',
            street: 'Street 1',
            number: '5123',
            city: 'City 1',
            state: 'State 1',
            zipCode: '18075-000',
            active: true,
            rewardPoints: 300,
        });
    });

    it('should update a customer', async () => {
        const { sut } = makeSUT();
        const customer = new Customer('1', 'Customer 1');
        customer.changeAddress(
            new Address('Street 1', '5123', 'City 1', 'State 1', '18075-000'),
        );
        customer.addRewardPoints(300);

        await sut.create(customer);

        const customerUpdated = new Customer('1', 'Customer 1 Updated');
        customerUpdated.changeAddress(
            new Address('Street 1', '5123', 'City 1', 'State 1', '18075-000'),
        );
        customerUpdated.addRewardPoints(50);

        await sut.update(customerUpdated);

        const customerModel = await CustomerModel.findOne({
            where: { id: '1' },
        });
        expect(customerModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Customer 1 Updated',
            street: 'Street 1',
            number: '5123',
            city: 'City 1',
            state: 'State 1',
            zipCode: '18075-000',
            active: false,
            rewardPoints: 50,
        });
    });

    it('should find a customer by id', async () => {
        const { sut } = makeSUT();
        const customer = new Customer('1', 'Customer 1');
        customer.changeAddress(
            new Address('Any Street', '5123', 'City 1', 'State 1', '18075-000'),
        );
        customer.activate();

        await sut.create(customer);

        const customerFound = await sut.findById('1');

        expect(customerFound).toStrictEqual(customer);
    });

    it('should return null if customer not found', async () => {
        const { sut } = makeSUT();
        const customerFound = await sut.findById('1');
        expect(customerFound).toBeNull();
    });

    it('should return an empty array if no customers found', async () => {
        const { sut } = makeSUT();
        const customers = await sut.findAll();
        expect(customers).toStrictEqual([]);
    });

    it('should return all customers', async () => {
        const { sut } = makeSUT();
        const customer1 = new Customer('1', 'Customer 1');
        customer1.changeAddress(
            new Address('Any Street', '5123', 'City 1', 'State 1', '18075-000'),
        );
        customer1.addRewardPoints(100);

        const customer2 = new Customer('2', 'Customer 2');
        customer2.changeAddress(
            new Address(
                'Another Street',
                '4781',
                'City 2',
                'State 2',
                '18075-000',
            ),
        );
        customer2.addRewardPoints(200);

        await sut.create(customer1);
        await sut.create(customer2);

        const customers = await sut.findAll();
        expect(customers).toStrictEqual([customer1, customer2]);
    });
});
