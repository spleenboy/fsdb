import { EventEmitter, Handler, Unsubscribe } from "./event-emitter";
import { Reactor, Property, Change } from "./reactor";

export class Reactive<T extends object> {
  data: T;
  changes: Change[] = [];
  unwatch?: Unsubscribe;
  #change: EventEmitter<Change>;

  constructor(data: T) {
    this.#change = new EventEmitter<Change>();
    const reactor = new Reactor(this.#change);
    this.data = new Proxy(data, reactor) as T;
    this.watch();
  }

  watch() {
    this.unwatch = this.#change.subscribe((change) => {
      this.changes.push(change);
    });
  }

  onChange(handler: Handler<Change>): Unsubscribe {
    return this.#change.subscribe(handler);
  }
}
