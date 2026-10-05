import { describe, expect, it } from "vitest";
import { formatPrice } from "./format-price";

describe("formatPrice", () => {
  it("antepone el símbolo de la moneda y fija dos decimales", () => {
    expect(formatPrice(5)).toBe("S/ 5.00");
    expect(formatPrice(1234.5)).toBe("S/ 1234.50");
  });
});
