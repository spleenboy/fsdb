import { FileAdapter } from "../format";
import { Config } from "./config";
import { Storage } from "../storage";
import { Record } from "./record";

export class Db {
  protected storage: Storage;
  protected adapter: FileAdapter;

  constructor(config: Config) {
    this.storage = config.storage;
    this.adapter = config.encoder;
  }

  public async get(path: string, lock: boolean = false): Promise<Record> {
    const file = await this.storage.get(path, lock);
    const doc = this.adapter.toObject(file);
    const record = new Record(doc, file);
    if (lock) {
      record.key = file.lock.key;
    }
    return record;
  }

  public async save(doc: Document): Promise<boolean> {
    const newFile = this.adapter.toFile(doc);
    const originalPath = this.adapter.getOriginalPath(doc);

    const file = await this.storage.get(path);
    return await this.storage.put(file);
  }

  public async delete(document: Document): Promise<boolean> {
    const path = this.adapter.getPath(document);
    return this.storage.delete(path);
  }

  public async list(pattern: RegExp, withContent = false): Promise<Document[]> {
    const files = await this.storage.list(pattern, withContent);
    return files.map((file) => this.adapter.toObject(file));
  }
}
