import { EventInterface } from '../@shared/event.interface';

export default class ProductCreatedEvent implements EventInterface {
	occurredAt: Date;
	eventData: any;

	constructor(eventData: any) {
		this.occurredAt = new Date();
		this.eventData = eventData;
	}
}
