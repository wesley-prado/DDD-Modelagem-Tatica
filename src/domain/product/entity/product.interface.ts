export default interface ProductInterface {
    get Id(): string;
    get Name(): string;
    changeName(name: string): void;
    get Price(): number;
    changePrice(price: number): void;
}
