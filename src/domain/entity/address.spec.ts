import { Address } from './address';

describe('Address unit tests', () => {
	it('should create an address', () => {
		const address = new Address(
			'any_street',
			'any_number',
			'any_city',
			'any_state',
			'any_zipCode',
		);

		expect(address).toBeDefined();
	});

	it('should return the address as a string', () => {
		const address = new Address(
			'any_street',
			'any_number',
			'any_city',
			'any_state',
			'any_zipCode',
		);

		expect(address.toString()).toBe(
			'any_street, any_number - any_city/any_state - any_zipCode',
		);
	});

	it('should throw an error if street is invalid', () => {
		expect(
			() =>
				new Address(
					'',
					'any_number',
					'any_city',
					'any_state',
					'any_zipCode',
				),
		).toThrow(new Error('Street must be at least 3 characters long'));
	});

	it('should throw an error if number is invalid', () => {
		expect(
			() =>
				new Address(
					'any_street',
					'',
					'any_city',
					'any_state',
					'any_zipCode',
				),
		).toThrow(new Error('Number must be at least 1 character long'));
	});

	it('should throw an error if city is invalid', () => {
		expect(
			() =>
				new Address(
					'any_street',
					'any_number',
					'',
					'any_state',
					'any_zipCode',
				),
		).toThrow(new Error('City must be at least 3 characters long'));
	});

	it('should throw an error if state is invalid', () => {
		expect(
			() =>
				new Address(
					'any_street',
					'any_number',
					'any_city',
					'',
					'any_zipCode',
				),
		).toThrow(new Error('State must be at least 2 characters long'));
	});

	it('should throw an error if zipCode is invalid', () => {
		expect(
			() =>
				new Address(
					'any_street',
					'any_number',
					'any_city',
					'any_state',
					'',
				),
		).toThrow(new Error('Zip Code must be at least 8 characters long'));
	});

	it('should return all address properties correctly', () => {
		const address = new Address(
			'any_street',
			'any_number',
			'any_city',
			'any_state',
			'any_zipCode',
		);

		expect(address.Street).toBe('any_street');
		expect(address.Number).toBe('any_number');
		expect(address.City).toBe('any_city');
		expect(address.State).toBe('any_state');
		expect(address.ZipCode).toBe('any_zipCode');
	});
});
