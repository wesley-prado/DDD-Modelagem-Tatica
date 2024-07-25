import { EventHandlerInterface } from '../../@shared';
import { CustomerCreatedEvent } from '../';

export class EnviaConsoleLog1Handler
	implements EventHandlerInterface<CustomerCreatedEvent>
{
	async handle(event: CustomerCreatedEvent): Promise<void> {
		console.log(
			`Esse é o primeiro console.log do evento: ${event.constructor.name}`,
		);
	}
}
