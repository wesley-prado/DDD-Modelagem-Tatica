import { Sequelize } from 'sequelize-typescript';
import Product from '../../../../domain/product/entity/product';
import ProductModel from './product.model';
import ProductRepository from './product.repository';

type SUTWrapper = {
    sut: ProductRepository;
};

const makeSUT = (): SUTWrapper => {
    const sut = new ProductRepository();
    return { sut };
};

describe('ProductRepository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
            models: [ProductModel],
        });

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const { sut } = makeSUT();
        const product = new Product('1', 'Product 1', 100);
        await sut.create(product);

        const productModel = await ProductModel.findOne({ where: { id: '1' } });
        expect(productModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Product 1',
            price: 100,
        });
    });

    it('should update a product', async () => {
        const { sut } = makeSUT();
        const product = new Product('1', 'Product 1', 100);
        await sut.create(product);

        const productUpdated = new Product('1', 'Product 1 Updated', 200);
        await sut.update(productUpdated);

        const productModel = await ProductModel.findOne({ where: { id: '1' } });
        expect(productModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'Product 1 Updated',
            price: 200,
        });
    });

    it('should find a product by id', async () => {
        const { sut } = makeSUT();
        const product = new Product('1', 'Product 1', 100);
        await sut.create(product);

        const productFound = await sut.findById('1');
        expect(productFound).toStrictEqual(product);
    });

    it('should return null if product not found', async () => {
        const { sut } = makeSUT();
        const productFound = await sut.findById('1');
        expect(productFound).toBeNull();
    });

    it('should return an empty array if no products found', async () => {
        const { sut } = makeSUT();
        const products = await sut.findAll();
        expect(products).toStrictEqual([]);
    });

    it('should return all products', async () => {
        const { sut } = makeSUT();
        const product1 = new Product('1', 'Product 1', 100);
        const product2 = new Product('2', 'Product 2', 200);
        await sut.create(product1);
        await sut.create(product2);

        const products = await sut.findAll();
        expect(products).toStrictEqual([product1, product2]);
    });
});
