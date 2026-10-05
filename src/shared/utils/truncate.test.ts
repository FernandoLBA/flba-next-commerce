import { describe, expect, it } from "vitest";
import { truncate } from "./truncate";

describe("truncate", () => {
  it("no toca un texto que cabe", () => {
    expect(truncate("hola mundo", 20)).toBe("hola mundo");
  });

  it("recorta en un límite de palabra y añade puntos suspensivos", () => {
    expect(truncate("uno dos tres cuatro", 10)).toBe("uno dos...");
  });

  it("colapsa espacios y saltos de línea", () => {
    expect(truncate("  uno \n\n  dos   ", 50)).toBe("uno dos");
  });
});
