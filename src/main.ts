import { Customer, Address, Order, OrderItem } from './entity';

// Agregado Customer
const customer = new Customer('1', 'John Doe');
const address = new Address('Main St', '123', 'Springfield', 'IL', '18075260');
customer.Address = address;
customer.activate();

// Agregado Order
const item1 = new OrderItem('1', '1', 2, 10);
const item2 = new OrderItem('2', '2', 1, 20);
const item3 = new OrderItem('3', '3', 3, 5);
const order = new Order('1', customer.Id, [item1, item2, item3]);

console.log(customer);
console.log(order);
