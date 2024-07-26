import Product from '../entity/product';

export default class ProductService {
    static changePrice(products: Product[], percentage: number) {
        if (percentage < 0) {
            throw new Error('Percentage should be greater than or equal to 0');
        }

        products.forEach((product) => {
            product.changePrice(
                product.Price + (product.Price * percentage) / 100,
            );
        });
    }
}
