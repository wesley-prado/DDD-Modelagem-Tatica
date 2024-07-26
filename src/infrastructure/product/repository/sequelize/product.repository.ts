import Product from '../../../../domain/product/entity/product';
import { ProductRepositoryInterface } from '../../../../domain/product/repository/product-repository.interface';
import ProductModel from './product.model';

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.Id,
            name: entity.Name,
            price: entity.Price,
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            { name: entity.Name, price: entity.Price },
            { where: { id: entity.Id } },
        );
    }

    async findById(id: string): Promise<Product | null> {
        const productModel = await ProductModel.findOne({ where: { id } });

        return productModel
            ? new Product(
                  productModel.id,
                  productModel.name,
                  productModel.price,
              )
            : null;
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();

        return products.map(
            (product) => new Product(product.id, product.name, product.price),
        );
    }
}
