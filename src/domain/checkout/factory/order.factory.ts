import Order from '../entity/order';
import OrderItem from '../entity/order_item';

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: OrderItemProps[];
}

interface OrderItemProps {
    id: string;
    price: number;
    productId: string;
    quantity: number;
}

export default class OrderFactory {
    static create(props: OrderFactoryProps): Order {
        const items = props.items.map((item) => {
            return new OrderItem(
                item.id,
                item.productId,
                item.quantity,
                item.price,
            );
        });

        return new Order(props.id, props.customerId, items);
    }
}
