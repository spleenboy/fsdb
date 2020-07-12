import { EventEmitter, Handler, Unsubscribe } from "./event-emitter";

export type Property = string | number | symbol;

export interface Change {
  time: number;
  prop: Property;
  oldValue: any;
  newValue: any;
}

export class Reactive<T extends object> {
  data: T;
  changes: Change[] = [];
  unwatch?: Unsubscribe;
  #change: EventEmitter<Change>;

  constructor(data: T) {
    this.#change = new EventEmitter<Change>();
    const reactor = this.proxyHandler(this.#change);
    this.data = new Proxy(data, reactor);
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

  private proxyHandler(emitter: EventEmitter<Change>): T {
    return {
      set(
        target: object,
        prop: Property,
        newValue: any,
        receiver?: any
      ): boolean {
        const oldValue = Reflect.get(target, prop, receiver);
        if (oldValue !== newValue) {
          const time = Date.now();
          const change = { prop, oldValue, newValue, time };
          emitter.emit(change);
        }
        return Reflect.set(target, prop, newValue, receiver);
      },
    } as T;
  }
}
