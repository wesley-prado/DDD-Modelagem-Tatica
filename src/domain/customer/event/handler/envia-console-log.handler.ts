import { EventHandlerInterface } from '../../../@shared/event';
import CustomerAddressChangedEvent from '../customer-address-changed.event';

export class EnviaConsoleLogHandler
    implements EventHandlerInterface<CustomerAddressChangedEvent>
{
    async handle(event: CustomerAddressChangedEvent): Promise<void> {
        const { id, address, name: nome } = event.eventData;
        const endereco = address.toString();

        console.log(
            `Endereço do cliente: ${id}, ${nome} alterado para: ${endereco}`,
        );
    }
}
