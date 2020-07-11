import { EventEmitter, Handler, Unsubscribe } from "./event-emitter";
import { Change, Reactor } from "./reactor";

export class Reactive {
  data: object;
  changes: Change[] = [];

  protected changed: EventEmitter<Change>;

  constructor(data: object) {
    this.data = data;
    this.changed = new EventEmitter<Change>();

    const reactor = new Reactor(this.changed);
    const proxy = new Proxy(data, reactor);
    this.changed.subscribe((change) => this.changes.push(change));
  }

  onChange(handler: Handler<Change>): Unsubscribe {
    return this.changed.subscribe(handler);
  }
}
