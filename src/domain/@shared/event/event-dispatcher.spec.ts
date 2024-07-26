import { EventDispatcher } from '.';
import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../product/event/product-created.event';

describe('Domain events tests', () => {
    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventName = 'ProductCreatedEvent';

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toEqual([
            eventHandler,
        ]);
        expect(eventDispatcher.getEventHandlers[eventName]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toBe(
            eventHandler,
        );
    });

    it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventName = 'ProductCreatedEvent';

        eventDispatcher.register(eventName, eventHandler);
        eventDispatcher.unregister(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toEqual([]);
        expect(eventDispatcher.getEventHandlers[eventName]).toHaveLength(0);
    });

    it('should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);
        eventDispatcher.register('ProductUpdatedEvent', eventHandler);
        eventDispatcher.register('ProductDeletedEvent', eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers).toEqual({});
    });

    it('should notify all event handlers', async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        const event = new ProductCreatedEvent({
            product: {
                id: '1',
                name: 'Product 1',
                description: 'Product 1 description',
            },
            email: 'any_email@mail.com',
        });

        const handleSpy = jest.spyOn(eventHandler, 'handle');

        await eventDispatcher.notify(event);

        expect(handleSpy).toHaveBeenCalledTimes(1);
        expect(handleSpy).toHaveBeenCalledWith(event);
    });

    it('should throw an error when notifying an event without handlers', async () => {
        const eventDispatcher = new EventDispatcher();
        const event = new ProductCreatedEvent({
            id: '1',
            name: 'Product 1',
            description: 'Product 1 description',
        });

        await expect(eventDispatcher.notify(event)).rejects.toEqual(
            'No handlers registered for this event',
        );
    });
});
