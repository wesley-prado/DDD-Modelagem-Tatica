import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/vo/address';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository.interface';
import {
    EventDispatcher,
    EventDispatcherInterface,
} from '../../../../domain/@shared/event';
import {
    CustomerAddressChangedEventDataType,
    CustomerCreatedEventDataType,
    EnviaConsoleLog1Handler,
    EnviaConsoleLog2Handler,
    EnviaConsoleLogHandler,
} from '../../../../domain/customer/event';
import CustomerEventRepositoryDecorator from './customer-event-repository.decorator';

type SutTypes = {
    repository: CustomerRepositoryInterface;
    sut: CustomerEventRepositoryDecorator;
    eventDispatcher: EventDispatcherInterface;
};

const createSUT = (): SutTypes => {
    const repository: CustomerRepositoryInterface = {
        create: jest.fn(),
        update: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
    };
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.register(
        'CustomerCreatedEvent',
        new EnviaConsoleLog1Handler(),
    );
    eventDispatcher.register(
        'CustomerCreatedEvent',
        new EnviaConsoleLog2Handler(),
    );
    eventDispatcher.register(
        'CustomerAddressChangedEvent',
        new EnviaConsoleLogHandler(),
    );

    const sut = new CustomerEventRepositoryDecorator(
        repository,
        eventDispatcher,
    );

    return {
        repository,
        sut,
        eventDispatcher,
    };
};

describe('CustomerRepositoryDecorator unit test', () => {
    it('should send CustomerCreatedEvent when customer is created', async () => {
        const { sut, repository, eventDispatcher } = createSUT();
        const eventDispatcherSpy = jest.spyOn(eventDispatcher, 'notify');

        const customer = new Customer('1', 'Customer 1');

        await sut.create(customer);

        expect(repository.create).toHaveBeenCalledWith(customer);
        const eventData: CustomerCreatedEventDataType = {
            id: customer.Id,
            name: customer.Name,
        };
        expect(eventDispatcherSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                eventData: expect.objectContaining(eventData),
                occurredAt: expect.any(Date),
            }),
        );

        const repoCall = (repository.create as jest.Mock).mock
            .invocationCallOrder[0];
        const eventDispatcherCall = (eventDispatcher.notify as jest.Mock).mock
            .invocationCallOrder[0];

        // Ensure that the repository call was made before the event dispatcher call
        expect(repoCall).toBeLessThan(eventDispatcherCall);
    });

    it('should send CustomerAddressChangedEvent when customer is updated', async () => {
        const { sut, repository, eventDispatcher } = createSUT();
        const eventDispatcherSpy = jest.spyOn(eventDispatcher, 'notify');
        const customer = new Customer('1', 'Customer 1');
        customer.changeAddress(
            new Address('Rua 1', '123', 'City 1', 'State 1', '18075-000'),
        );

        await sut.update(customer);

        expect(repository.update).toHaveBeenCalledWith(customer);
        const eventData: CustomerAddressChangedEventDataType = {
            id: customer.Id,
            name: customer.Name,
            address: customer.Address,
        };
        expect(eventDispatcherSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                eventData: expect.objectContaining(eventData),
                occurredAt: expect.any(Date),
            }),
        );

        const repoCall = (repository.update as jest.Mock).mock
            .invocationCallOrder[0];
        const eventDispatcherCall = (eventDispatcherSpy as jest.Mock).mock
            .invocationCallOrder[0];

        // Ensure that the repository call was made before the event dispatcher call
        expect(repoCall).toBeLessThan(eventDispatcherCall);
    });

    it('should throw if repository is not provided', () => {
        const eventDispatcher = new EventDispatcher();
        expect(() => {
            new CustomerEventRepositoryDecorator(undefined, eventDispatcher);
        }).toThrow('Repository is required');
    });

    it('should throw if eventDispatcher is not provided', () => {
        const repository: CustomerRepositoryInterface = {
            create: jest.fn(),
            update: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
        };
        expect(() => {
            new CustomerEventRepositoryDecorator(repository, undefined);
        }).toThrow('eventDispatcher is required');
    });

    it('should call repository findById', async () => {
        const { sut, repository } = createSUT();
        const customerId = '1';

        await sut.findById(customerId);

        expect(repository.findById).toHaveBeenCalledWith(customerId);
    });

    it('should call repository findAll', async () => {
        const { sut, repository } = createSUT();

        await sut.findAll();

        expect(repository.findAll).toHaveBeenCalled();
    });
});
