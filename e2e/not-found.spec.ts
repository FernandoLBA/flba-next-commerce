import { expect, test } from "@playwright/test";

const missing = [
  ["un producto con un id inválido", "/products/abc"],
  ["un producto que no existe", "/products/999999"],
  ["una página del listado fuera de rango", "/products?page=999"],
  ["una categoría que no existe", "/products?category=no-existe"],
  ["una ruta que no existe", "/ruta-inexistente"],
] as const;

for (const [description, path] of missing) {
  test(`responde 404 para ${description}`, async ({ page }) => {
    const response = await page.goto(path);

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Página no encontrada" }),
    ).toBeVisible();
  });
}
