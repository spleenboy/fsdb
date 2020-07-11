import { Adapter } from "../format";
import { Storage } from "../storage";

export interface Config {
  storage: Storage;
  encoder: Adapter;
}
