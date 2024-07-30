import Product from '../entity/product';
import ProductB from '../entity/product-b';
import ProductFactory from './product.factory';

describe('Product factory unit tests', () => {
    it('should create a product of type A', () => {
        const product = ProductFactory.create('A', 'product A', 35.5);

        expect(product).toBeInstanceOf(Product);
        expect(product.Id).toBeDefined();
        expect(product.Name).toBe('product A');
        expect(product.Price).toBe(35.5);
    });

    it('should create a product of type B', () => {
        const product = ProductFactory.create('B', 'product B', 35.5);

        expect(product).toBeInstanceOf(ProductB);
        expect(product.Id).toBeDefined();
        expect(product.Name).toBe('product B');
        expect(product.Price).toBe(71);
    });

    it('should throw an error when product type is invalid', () => {
        expect(() => ProductFactory.create('C', 'product C', 35.5)).toThrow(
            'Invalid product type',
        );
    });
});
