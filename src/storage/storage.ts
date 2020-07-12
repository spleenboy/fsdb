import { File } from "./file";

export interface Storage {
  get: (path: string) => Promise<File>;
  put: (file: File) => Promise<boolean>;
  delete: (path: string) => Promise<boolean>;
  move: (oldPath: string, newPath: string) => Promise<boolean>;
  list: (pattern: RegExp, withContent: boolean) => Promise<File[]>;
}
