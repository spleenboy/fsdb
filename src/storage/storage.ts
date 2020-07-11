import { File } from "./file";
import { Lock } from "./lock";

export interface Storage {
  get: (path: string, lock: boolean) => Promise<File>;
  put: (file: File) => Promise<boolean>;
  delete: (path: string) => Promise<boolean>;
  move: (oldPath: string, newPath: string) => Promise<boolean>;
  list: (pattern: RegExp, withContent: boolean) => Promise<File[]>;
}
