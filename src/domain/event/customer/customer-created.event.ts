import { EventInterface } from '../@shared';

export type CustomerCreatedEventDataType = {
	id: string;
	name: string;
};

export class CustomerCreatedEvent implements EventInterface {
	occurredAt: Date;
	eventData: CustomerCreatedEventDataType;

	constructor(eventData: CustomerCreatedEventDataType) {
		this.occurredAt = new Date();
		this.eventData = eventData;
	}
}
