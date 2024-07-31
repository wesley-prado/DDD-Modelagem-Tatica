import Customer from '../entity/customer';
import Address from '../vo/address';
import CustomerFactory from './customer.factory';

describe('Customer factory unit tests', () => {
    it('should create a customer', () => {
        const customer = CustomerFactory.create('John Doe');

        expect(customer).toBeInstanceOf(Customer);
        expect(customer.Id).toBeDefined();
        expect(customer.Name).toBe('John Doe');
        expect(customer.Address).toBeUndefined();
    });

    it('should create a customer with address', () => {
        const address = new Address(
            'main st.',
            '123',
            'City',
            'State',
            '18075-000',
        );
        const customer = CustomerFactory.createWithAddress('John Doe', address);

        expect(customer).toBeInstanceOf(Customer);
        expect(customer.Id).toBeDefined();
        expect(customer.Name).toBe('John Doe');
        expect(customer.Address).toBe(address);
    });
});
