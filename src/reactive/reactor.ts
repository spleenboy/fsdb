import { EventEmitter } from "./event-emitter";

export type Property = string | number | symbol;

export interface Change {
  time: number;
  prop: Property;
  oldValue: any;
  newValue: any;
}

export class Reactor {
  #emitter: EventEmitter<Change>;

  constructor(emitter: EventEmitter<Change>) {
    this.#emitter = emitter;
  }

  get(target: object, prop: Property, receiver?: any): any {
    return Reflect.get(target, prop, receiver);
  }

  set(target: object, prop: Property, newValue: any, receiver?: any): boolean {
    const oldValue = Reflect.get(target, prop, receiver);
    if (oldValue !== newValue) {
      const time = Date.now();
      const change = { prop, oldValue, newValue, time };
      this.#emitter.emit(change);
    }
    return Reflect.set(target, prop, newValue, receiver);
  }
}
