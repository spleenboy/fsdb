import { Lock } from "./lock";

export interface File {
  lock: Lock;
  path: string;
  content: string;
}
