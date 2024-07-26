// import { Address, Customer } from '.';
import Customer from './customer';
import Address from '../vo/address';

describe('Customer unit tests', () => {
    it('should throw an error when id is empty', () => {
        expect(() => new Customer('', 'John Doe')).toThrow('Id is required');
    });

    it('should throw an error when name has less than 2 characters', () => {
        expect(() => new Customer('any_id', '')).toThrow(
            'Name must be at least 2 characters long',
        );
        expect(() => new Customer('any_id', 'J')).toThrow(
            'Name must be at least 2 characters long',
        );
    });

    it('should not throw an error when id is not empty and name has 2 or more characters', () => {
        expect(() => new Customer('any_id', 'John Doe')).not.toThrow();
    });

    it('should change the name', () => {
        const customer = new Customer('any_id', 'John Doe');

        customer.changeName('Jane Doe');

        expect(customer.Name).toBe('Jane Doe');
    });

    it('should activate the customer', () => {
        const customer = new Customer('any_id', 'John Doe');

        customer.changeAddress(
            new Address(
                'any_street',
                '123',
                'any_city',
                'any_state',
                '18075000',
            ),
        );

        customer.activate();

        expect(customer.IsActive).toBe(true);
    });

    it('should deactivate the customer', () => {
        const customer = new Customer('any_id', 'John Doe');

        customer.deactivate();

        expect(customer.IsActive).toBe(false);
    });

    it('should throw an error when activating a customer without an address', () => {
        const customer = new Customer('any_id', 'John Doe');

        expect(() => customer.activate()).toThrow(
            'Address is required to activate a customer',
        );

        expect(customer.IsActive).toBe(false);
    });

    it('should get the customer id', () => {
        const customer = new Customer('any_id', 'John Doe');

        expect(customer.Id).toBe('any_id');
    });

    it('should get the customer name', () => {
        const customer = new Customer('any_id', 'John Doe');

        expect(customer.Name).toBe('John Doe');
    });

    it('should add reward points', () => {
        const customer = new Customer('any_id', 'John Doe');
        expect(customer.RewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.RewardPoints).toBe(10);

        customer.addRewardPoints(20);
        expect(customer.RewardPoints).toBe(30);
    });
});
