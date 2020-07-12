import { File } from "../storage";
import { Reactive } from "../reactive";

export class Record<T extends object> {
  reactive: Reactive<T>;
  file?: File;

  constructor(data: T, file?: File) {
    this.reactive = new Reactive<T>(data);
    this.file = file;
  }

  public get data(): T | undefined {
    return this.reactive.data;
  }

  public get changed(): boolean {
    return !!this.reactive.changes.length;
  }
}
