import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';

export type AddressColumns = {
	street: string;
	number: string;
	city: string;
	state: string;
	zipCode: string;
};

@Table({ tableName: 'customers' })
export class CustomerModel extends Model {
	@PrimaryKey
	@Column
	declare id: string;

	@Column({ allowNull: false })
	declare name: string;

	@Column({ allowNull: false })
	declare street: string;

	@Column({ allowNull: false })
	declare number: string;

	@Column({ allowNull: false })
	declare city: string;

	@Column({ allowNull: false })
	declare state: string;

	@Column({ allowNull: false })
	declare zipCode: string;

	@Column({ allowNull: false })
	declare active: boolean;

	@Column({ allowNull: false })
	declare rewardPoints: number;
}
