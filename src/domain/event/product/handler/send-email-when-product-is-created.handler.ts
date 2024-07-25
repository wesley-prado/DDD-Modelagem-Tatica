import { EventHandlerInterface } from '../../@shared/';
import ProductCreatedEvent from '../product-created.event';

export class SendEmailWhenProductIsCreatedHandler
	implements EventHandlerInterface<ProductCreatedEvent>
{
	async handle(event: ProductCreatedEvent): Promise<void> {
		console.log(`Sending email to ${event.eventData.email}`);
	}
}
