import { EventEmitter } from ".";

describe("EventEmitter", () => {
  it("should emit events", () => {
    const emitter = new EventEmitter<string>();
    emitter.subscribe((value) => {
      expect<string>(value).toEqual("hello world");
    });
    emitter.emit("hello world");
  });
});
