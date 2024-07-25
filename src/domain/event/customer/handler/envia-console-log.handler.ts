import { EventHandlerInterface } from '../../@shared';
import { CustomerAddressChangedEvent } from '../';

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
