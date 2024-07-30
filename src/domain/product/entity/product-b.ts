import ProductInterface from './product.interface';

export default class ProductB implements ProductInterface {
    private readonly errors = Object.freeze({
        PRODUCT_EMPTY_ID_ERROR: 'Product must have an id',
        PRODUCT_EMPTY_NAME_ERROR: 'Product must have a name',
        PRODUCT_PRICE_ERROR: 'Product must have a price greater than zero',
    });

    constructor(
        private id: string,
        private name: string,
        private price: number,
    ) {
        this.validate();
    }

    private validate() {
        this.isNotBlank(this.id, this.errors.PRODUCT_EMPTY_ID_ERROR);
        this.isNotBlank(this.name, this.errors.PRODUCT_EMPTY_NAME_ERROR);
        this.isPositive(this.price, this.errors.PRODUCT_PRICE_ERROR);
    }

    get Id(): string {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }

    changeName(name: string): void {
        this.isNotBlank(name, this.errors.PRODUCT_EMPTY_NAME_ERROR);
        this.name = name;
    }

    get Price(): number {
        return this.price * 2;
    }

    changePrice(price: number): void {
        this.isPositive(price, this.errors.PRODUCT_PRICE_ERROR);
        this.price = price;
    }

    private isNotBlank(str: string, errorMessage: string) {
        if (!str) {
            throw new Error(errorMessage);
        }
    }

    private isPositive(num: number, errorMessage: string) {
        if (num <= 0) {
            throw new Error(errorMessage);
        }
    }
}
