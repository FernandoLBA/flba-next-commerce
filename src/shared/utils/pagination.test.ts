import { describe, expect, it } from "vitest";
import { toPagination } from "./pagination";

describe("toPagination", () => {
  it("convierte skip, total y limit en page y totalPages", () => {
    expect(toPagination({ total: 194, skip: 0, limit: 20 })).toEqual({
      page: 1,
      totalPages: 10,
    });

    expect(toPagination({ total: 194, skip: 80, limit: 20 })).toEqual({
      page: 5,
      totalPages: 10,
    });
  });

  it("calcula bien la última página, aunque quede incompleta", () => {
    expect(toPagination({ total: 194, skip: 180, limit: 20 })).toEqual({
      page: 10,
      totalPages: 10,
    });
  });

  it("usa el límite pedido y no el que devuelve la API en la última página", () => {
    expect(toPagination({ total: 194, skip: 190, limit: 20 })).toEqual({
      page: 10,
      totalPages: 10,
    });
  });

  it("no divide por cero con un límite de 0", () => {
    const { page, totalPages } = toPagination({ total: 10, skip: 0, limit: 0 });

    expect(Number.isFinite(page)).toBe(true);
    expect(Number.isFinite(totalPages)).toBe(true);
  });

  it("devuelve al menos una página aunque no haya resultados", () => {
    expect(toPagination({ total: 0, skip: 0, limit: 20 })).toEqual({
      page: 1,
      totalPages: 1,
    });
  });
});
