import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/vo/address';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import Product from '../../../../domain/product/entity/product';
import OrderService from '../../../../domain/checkout/service/order.service';
import OrderRepository from './order.repository';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import OrderModel from './order.model';
import OrderItemModel from './order-item.model';
import ProductModel from '../../../product/repository/sequelize/product.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import ProductRepository from '../../../product/repository/sequelize/product.repository';

type SUTWrapper = {
    sut: OrderRepository;
};

const createSUT = (): SUTWrapper => {
    const sut = new OrderRepository();
    return { sut };
};

const createActivatedCustomer = async (): Promise<Customer> => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('1', 'Jhon Doe');
    customer.changeAddress(
        new Address(
            'Any Street',
            '1000',
            'Any City',
            'Any State',
            'Any ZipCode',
        ),
    );
    customer.activate();

    await customerRepository.create(customer);

    return customer;
};

const createProducts = async (): Promise<Product[]> => {
    const productRepository = new ProductRepository();
    const products = [
        new Product('1', 'Product 1', 10),
        new Product('2', 'Product 2', 50),
    ];

    await productRepository.create(products[0]);
    await productRepository.create(products[1]);

    return products;
};

const createOrder = async (
    sut: OrderRepository,
    customer: Customer,
    products: Product[],
    quantities: number[],
) => {
    const orderItems = products.map(
        (product, index) =>
            new OrderItem(
                `${index + 1}`,
                product.Id,
                quantities[index],
                product.Price,
            ),
    );
    const order = OrderService.placeOrder(customer, orderItems);
    await sut.create(order);

    return {
        order,
        orderItems,
    };
};

describe('OrderRepository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
            models: [CustomerModel, OrderModel, OrderItemModel, ProductModel],
        });

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create order', async () => {
        const { sut } = createSUT();
        const customer = await createActivatedCustomer();
        const [product] = await createProducts();
        const { order, orderItems } = await createOrder(
            sut,
            customer,
            [product],
            [1],
        );

        const orderFound = await OrderModel.findOne({
            where: { id: order.Id },
            include: ['items'],
        });

        expect(orderFound.toJSON()).toStrictEqual({
            id: order.Id,
            customer_id: customer.Id,
            total: 10,
            items: [
                {
                    id: orderItems[0].Id,
                    order_id: order.Id,
                    product_id: product.Id,
                    quantity: 1,
                    price: 10,
                },
            ],
        });
    });

    it('should update order', async () => {
        const { sut } = createSUT();
        const customer = await createActivatedCustomer();
        const [product1, product2] = await createProducts();
        const { order, orderItems } = await createOrder(
            sut,
            customer,
            [product1],
            [3],
        );

        const orderItem = new OrderItem('2', product2.Id, 1, product2.Price);
        order.addItems([orderItem]);
        orderItems.push(orderItem);

        await sut.update(order);

        const updatedOrder = await OrderModel.findOne({
            where: { id: order.Id },
            include: ['items'],
        });

        expect(updatedOrder.items).toHaveLength(2);
        expect(updatedOrder.toJSON()).toStrictEqual({
            id: order.Id,
            customer_id: customer.Id,
            total: product1.Price * 3 + product2.Price,
            items: [
                {
                    id: orderItems[0].Id,
                    order_id: order.Id,
                    product_id: product1.Id,
                    quantity: 3,
                    price: product1.Price,
                },
                {
                    id: orderItems[1].Id,
                    order_id: order.Id,
                    product_id: product2.Id,
                    quantity: 1,
                    price: product2.Price,
                },
            ],
        });
    });

    it('should rollback transaction if an error occurs', async () => {
        jest.spyOn(OrderItemModel, 'bulkCreate').mockImplementation(() =>
            Promise.reject(new Error('Test error')),
        );

        const { sut } = createSUT();
        const customer = await createActivatedCustomer();
        const [product1, product2] = await createProducts();
        const { order, orderItems } = await createOrder(
            sut,
            customer,
            [product1],
            [3],
        );

        order.addItems([new OrderItem('2', product2.Id, 1, product2.Price)]);

        await expect(sut.update(order)).rejects.toThrow(
            new Error('Test error'),
        );

        const orderFound = await OrderModel.findOne({
            where: { id: order.Id },
            include: ['items'],
        });

        expect(orderFound.items).toHaveLength(1);
        expect(orderFound.toJSON()).toStrictEqual({
            id: order.Id,
            customer_id: customer.Id,
            total: product1.Price * 3,
            items: [
                {
                    id: orderItems[0].Id,
                    order_id: order.Id,
                    product_id: product1.Id,
                    quantity: 3,
                    price: 10,
                },
            ],
        });
    });

    it('should find order by id', async () => {
        const { sut } = createSUT();
        const customer = await createActivatedCustomer();
        const [product] = await createProducts();
        const { order } = await createOrder(sut, customer, [product], [1]);

        const foundOrder = await sut.findById(order.Id);

        expect(foundOrder).toStrictEqual(order);
    });

    it('should return null if order not found', async () => {
        const { sut } = createSUT();

        const foundOrder = await sut.findById('1');

        expect(foundOrder).toBeNull();
    });

    it('should return all orders', async () => {
        const { sut } = createSUT();
        const customer = await createActivatedCustomer();
        const [product] = await createProducts();

        const orderItem1 = new OrderItem('1', product.Id, 1, product.Price);
        const order1 = OrderService.placeOrder(customer, [orderItem1]);
        await sut.create(order1);

        const orderItem2 = new OrderItem('2', product.Id, 2, product.Price);
        const order2 = OrderService.placeOrder(customer, [orderItem2]);
        await sut.create(order2);

        const orders = await sut.findAll();

        expect(orders).toHaveLength(2);
        expect(orders).toStrictEqual([order1, order2]);
    });

    it('should return empty array if there are no orders', async () => {
        const { sut } = createSUT();

        const orders = await sut.findAll();

        expect(orders).toHaveLength(0);
    });
});
