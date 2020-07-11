import { Storage } from "./storage/storage";

let storage, format;

export interface Config {
    storage: Storage;
}

export function init(config: Config) {
    storage = config.storage;
}
