import { EventHandlerInterface } from '../../../@shared/event';
import { CustomerCreatedEvent } from '../';

export class EnviaConsoleLog2Handler
    implements EventHandlerInterface<CustomerCreatedEvent>
{
    async handle(event: CustomerCreatedEvent): Promise<void> {
        console.log(
            `Esse é o segundo console.log do evento: ${event.constructor.name}`,
        );
    }
}
