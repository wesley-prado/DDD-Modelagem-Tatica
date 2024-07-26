import { EventHandlerInterface } from '../../../@shared/event';
import ProductCreatedEvent from '../product-created.event';

export default class SendEmailWhenProductIsCreatedHandler
    implements EventHandlerInterface<ProductCreatedEvent>
{
    async handle(event: ProductCreatedEvent): Promise<void> {
        console.log(`Sending email to ${event.eventData.email}`);
    }
}
