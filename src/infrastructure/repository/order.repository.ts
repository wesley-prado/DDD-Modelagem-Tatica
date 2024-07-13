import { Order, OrderItem } from '../../domain/entity';
import { OrderRepositoryInterface } from '../../domain/repository';
import { OrderItemModel, OrderModel } from '../db/sequelize/model';

export class OrderRepository implements OrderRepositoryInterface {
	async create(entity: Order): Promise<void> {
		await OrderModel.create(
			{
				id: entity.Id,
				customer_id: entity.CustomerId,
				total: entity.Total,
				items: entity.Items.map((orderItem) => ({
					id: orderItem.Id,
					product_id: orderItem.ProductId,
					quantity: orderItem.Quantity,
					price: orderItem.Price,
				})),
			},
			{
				include: [{ model: OrderItemModel }],
			},
		);
	}

	async update(entity: Order): Promise<void> {
		await OrderModel.sequelize.transaction(async (t) => {
			const orderUpdate = OrderModel.update(
				{
					total: entity.Total,
				},
				{ where: { id: entity.Id }, transaction: t },
			);

			const itemUpsert = OrderItemModel.bulkCreate(
				entity.Items.map((orderItem) => ({
					id: orderItem.Id,
					order_id: entity.Id,
					product_id: orderItem.ProductId,
					quantity: orderItem.Quantity,
					price: orderItem.Price,
				})),
				{
					updateOnDuplicate: ['product_id', 'quantity', 'price'],
					transaction: t,
				},
			);

			await Promise.all([orderUpdate, itemUpsert]);
		});
	}

	async findById(id: string): Promise<Order | null> {
		const orderModel = await OrderModel.findOne({
			where: { id },
			include: ['items'],
		});

		if (!orderModel) {
			return null;
		}

		return this.createOrderFromModel(orderModel);
	}

	async findAll(): Promise<Order[]> {
		const orderModels = await OrderModel.findAll({
			include: ['items'],
		});

		return orderModels.map((orderModel) =>
			this.createOrderFromModel(orderModel),
		);
	}

	private createOrderFromModel(orderModel: OrderModel): Order {
		return new Order(
			orderModel.id,
			orderModel.customer_id,
			orderModel.items.map(
				(item) =>
					new OrderItem(
						item.id,
						item.product_id,
						item.quantity,
						item.price,
					),
			),
		);
	}
}
