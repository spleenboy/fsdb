import { File } from "../storage";
import { Reactive } from "../reactive";

export class Record {
  reactive: Reactive;
  file?: File;
  key?: string;

  constructor(data: object, file?: File) {
    this.reactive = new Reactive(data);
    this.file = file;
  }

  public get data(): object | undefined {
    return this.reactive.data;
  }

  public get locked(): boolean {
    return !!this.file?.lock?.enabled;
  }

  public get changed(): boolean {
    return !!this.reactive.changes.length;
  }
}
