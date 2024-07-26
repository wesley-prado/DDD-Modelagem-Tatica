import { EventInterface } from '../../@shared/event';
import Address from '../vo/address';

export type CustomerAddressChangedEventDataType = {
    id: string;
    name: string;
    address: Address;
};

export default class CustomerAddressChangedEvent implements EventInterface {
    occurredAt: Date;
    eventData: CustomerAddressChangedEventDataType;

    constructor(eventData: CustomerAddressChangedEventDataType) {
        this.occurredAt = new Date();
        this.eventData = eventData;
    }
}
