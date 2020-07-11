export type Handler<T> = (data: T) => void;
export type Unsubscribe = () => void;

export class EventEmitter<T> {
  protected handlers = new Set<Handler<T>>();

  subscribe(handler: Handler<T>): Unsubscribe {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  emit(data: T): void {
    this.handlers.forEach((handler) => handler(data));
  }
}
