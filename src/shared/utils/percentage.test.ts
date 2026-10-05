import { describe, expect, it } from "vitest";
import { addPercentage } from "./percentage";

describe("addPercentage", () => {
  it("suma el porcentaje al precio base con dos decimales", () => {
    expect(addPercentage(100, 10)).toBe("110.00");
    expect(addPercentage(9.99, 10.48)).toBe("11.04");
  });

  it("deja el precio igual con 0 %", () => {
    expect(addPercentage(50, 0)).toBe("50.00");
  });
});
