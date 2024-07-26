import Product from '../../product/entity/product';

describe('Product unit tests', () => {
    it('should throw an error when id is empty', () => {
        expect(() => new Product('', 'product name', 35.5)).toThrow(
            'Product must have an id',
        );
    });

    it('should throw an error when name is empty', () => {
        expect(() => new Product('1', '', 35.5)).toThrow(
            'Product must have a name',
        );
    });

    it('should throw an error when price is equal or less than zero', () => {
        expect(() => new Product('1', 'product name', 0)).toThrow(
            'Product must have a price greater than zero',
        );
    });

    it('should create a product when id is not empty', () => {
        const product = new Product('1', 'product name', 35.5);
        expect(product).toBeInstanceOf(Product);
    });

    it('should change name when changeName is called', () => {
        const product = new Product('1', 'product name', 35.5);
        product.changeName('new product name');

        expect(product.Name).toBe('new product name');
    });

    it('should throw an error when name is empty', () => {
        const product = new Product('1', 'product name', 35.5);
        expect(() => product.changeName('')).toThrow(
            'Product must have a name',
        );
    });

    it('should throw an error when price is equal or less than zero', () => {
        const product = new Product('1', 'product name', 35.5);
        expect(() => product.changePrice(0)).toThrow(
            'Product must have a price greater than zero',
        );
    });

    it('should change price when changePrice is called', () => {
        const product = new Product('1', 'product name', 35.5);
        product.changePrice(40.5);

        expect(product.Price).toBe(40.5);
    });
});
