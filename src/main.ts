import { Sequelize } from 'sequelize-typescript';
import { Customer, Address, OrderItem } from './domain/entity';
import { EventDispatcher } from './domain/event/@shared';
import { CustomerEventRepositoryDecorator } from './infrastructure/repository/';
import { OrderService } from './domain/service';
import { CustomerRepository } from './infrastructure/repository';
import {
    CustomerModel,
    OrderItemModel,
    OrderModel,
    ProductModel,
} from './infrastructure/db/sequelize/model';
import {
    EnviaConsoleLog1Handler,
    EnviaConsoleLog2Handler,
    EnviaConsoleLogHandler,
} from './domain/event/customer';

const customerRepository = new CustomerRepository();
const eventDispatcher = new EventDispatcher();
eventDispatcher.register('CustomerCreatedEvent', new EnviaConsoleLog1Handler());
eventDispatcher.register('CustomerCreatedEvent', new EnviaConsoleLog2Handler());
eventDispatcher.register(
    'CustomerAddressChangedEvent',
    new EnviaConsoleLogHandler(),
);

const customerEventRepoDecorator = new CustomerEventRepositoryDecorator(
    customerRepository,
    eventDispatcher,
);

const sequelize = new Sequelize('dddatabase', 'root', 'root', {
    host: 'db',
    dialect: 'mysql',
    logging: false,
    models: [CustomerModel, OrderItemModel, OrderModel, ProductModel],
});

(async () => {
    try {
        await sequelize.sync({ force: true }).catch((error) => {
            console.error('Unable to create tables:', error);
        });

        // Agregado Customer
        const customer = new Customer('1', 'John Doe');
        customer.changeAddress(
            new Address('Main St', '123', 'Springfield', 'IL', '18075260'),
        );
        customer.activate();

        await customerEventRepoDecorator.create(customer);

        customer.changeAddress(
            new Address('Another St', '456', 'Springfield', 'IL', '18075236'),
        );

        await customerEventRepoDecorator.update(customer);

        // Agregado Order
        const item1 = new OrderItem('1', '1', 2, 10);
        const item2 = new OrderItem('2', '2', 1, 20);
        const item3 = new OrderItem('3', '3', 3, 5);
        const order = OrderService.placeOrder(customer, [item1, item2, item3]);

        console.log(customer);
        console.log(order);
    } catch (error) {
        console.error(error);
    } finally {
        await sequelize.close();
    }
})();
