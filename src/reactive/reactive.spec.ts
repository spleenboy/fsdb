import "jasmine";
import { Reactive, Property, Change } from ".";

describe("Reactive objects", () => {
  it("should update the original and proxy", () => {
    interface Data {
      num: number;
      char: string;
      arr: number[];
    }

    const actual: Data = {
      num: 0,
      char: "a",
      arr: [1, 2, 3],
    };

    const reactive = new Reactive<Data>(actual);
    const proxy = reactive.data;
    expect<number>(proxy.num).toBe(0);
    expect<string>(proxy.char).toBe("a");
    expect<number[]>(proxy.arr).toEqual([1, 2, 3]);
  });

  it("should update the original and proxy", () => {
    interface Data {
      num: number;
    }
    const actual: Data = { num: 0 };

    const reactive = new Reactive<Data>(actual);
    const proxy = reactive.data;
    proxy.num = 1;
    expect<number>(proxy.num).toBe(1);
    expect<number>(actual.num).toBe(1);
  });

  it("should fire a change event", () => {
    interface Data {
      num: number;
    }
    const actual: Data = { num: 0 };
    const reactive = new Reactive<Data>(actual);
    const proxy = reactive.data;
    expect<number>(reactive.changes.length).toBe(0);

    proxy.num = 1;
    expect<number>(reactive.changes.length).toBe(1);

    const change = reactive.changes[0];
    expect<Property>(change.prop).toBe("num");
    expect<any>(change.oldValue).toBe(0);
    expect<any>(change.newValue).toBe(1);
  });

  it("should ignore no change", () => {
    interface Data {
      num: number;
    }
    const actual: Data = { num: 1 };
    const reactive = new Reactive<Data>(actual);
    expect<number>(reactive.changes.length).toBe(0);
    reactive.data.num = 1;
    expect<number>(reactive.changes.length).toBe(0);
  });
});
