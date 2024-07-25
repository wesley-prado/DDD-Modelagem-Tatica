import { Address } from '../../entity';
import { EventInterface } from '../@shared';

export type CustomerAddressChangedEventDataType = {
	id: string;
	name: string;
	address: Address;
};

export class CustomerAddressChangedEvent implements EventInterface {
	occurredAt: Date;
	eventData: CustomerAddressChangedEventDataType;

	constructor(eventData: CustomerAddressChangedEventDataType) {
		this.occurredAt = new Date();
		this.eventData = eventData;
	}
}
