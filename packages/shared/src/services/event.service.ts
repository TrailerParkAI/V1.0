type EventCallback = (data: any) => void | Promise<void>;

export class EventService {
  private static instance: EventService;
  private subscribers: Map<string, EventCallback[]>;

  private constructor() {
    this.subscribers = new Map();
  }

  static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  subscribe(event: string, callback: EventCallback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(callback);
  }

  async publish(event: string, data: any) {
    const callbacks = this.subscribers.get(event) || [];
    await Promise.all(callbacks.map(callback => callback(data)));
  }

  unsubscribe(event: string, callback: EventCallback) {
    const callbacks = this.subscribers.get(event) || [];
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }
}