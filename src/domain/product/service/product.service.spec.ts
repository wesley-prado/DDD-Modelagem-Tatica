import Product from '../../product/entity/product';
import ProductService from './product.service';

describe('Product unit tests', () => {
    it('should change the prices of all products', () => {
        const products = [
            new Product('any_id', 'any_name', 10),
            new Product('any_id', 'any_name', 20),
        ];

        const percentage = 100;
        ProductService.changePrice(products, percentage);

        expect(products[0].Price).toBe(20);
        expect(products[1].Price).toBe(40);
    });

    it('should throw an error if the percentage is less than 0', () => {
        const products = [
            new Product('any_id', 'any_name', 10),
            new Product('any_id', 'any_name', 20),
        ];

        const percentage = -1;

        expect(() => ProductService.changePrice(products, percentage)).toThrow(
            'Percentage should be greater than or equal to 0',
        );
    });
});
