import { File } from "../storage";

export interface FileAdapter {
  getPath: (data: object) => string;
  toFile: (data: object) => File;
  toObject: (file: File) => object;
}
