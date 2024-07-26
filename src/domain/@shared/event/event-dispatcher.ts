import {
    EventDispatcherInterface,
    EventHandlerInterface,
    EventInterface,
} from '.';

export class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } =
        {};

    notify(event: EventInterface): Promise<void> {
        const eventName = event.constructor.name;

        if (!this.eventHandlers[eventName]) {
            return Promise.reject('No handlers registered for this event');
        }

        for (const handler of this.eventHandlers[eventName]) {
            handler.handle(event);
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = this.eventHandlers[
                eventName
            ].filter((handler) => handler !== eventHandler);
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }
}
