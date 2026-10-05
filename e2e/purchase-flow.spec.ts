import { expect, test } from "@playwright/test";

test("flujo de compra: filtrar por categoría, ver el detalle y agregar al carrito", async ({
  page,
}) => {
  await page.goto("/products");

  // Filtro por categoría: vive en la URL.
  const sidebar = page.getByRole("complementary", { name: "Categorías" });
  await sidebar.getByRole("link", { name: "Beauty" }).click();
  await expect(page).toHaveURL(/category=beauty/);
  await expect(sidebar.getByRole("link", { name: "Beauty" })).toHaveAttribute(
    "aria-current",
    "page",
  );

  // Detalle del primer producto de la categoría.
  await page.locator("article").first().getByRole("link").first().click();
  await expect(page).toHaveURL(/\/products\/\d+$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // Agregar al carrito: el contador del header lo refleja.
  await page.getByRole("button", { name: "Agregar al carro" }).click();
  await expect(
    page.getByRole("link", { name: "Carrito, 1 artículo" }),
  ).toBeVisible();

  // El carrito muestra el producto.
  await page.getByRole("link", { name: "Carrito, 1 artículo" }).click();
  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.getByRole("heading", { name: "Carrito" })).toBeVisible();
  await expect(page.getByRole("main").getByRole("listitem")).toHaveCount(1);

  // Persiste al recargar (localStorage).
  await page.reload();
  await expect(
    page.getByRole("link", { name: "Carrito, 1 artículo" }),
  ).toBeVisible();
  await expect(page.getByRole("main").getByRole("listitem")).toHaveCount(1);
});

test("vaciar el carrito vuelve al estado vacío", async ({ page }) => {
  await page.goto("/products/1");
  await page.getByRole("button", { name: "Agregar al carro" }).click();
  await page.goto("/cart");

  await page.getByRole("button", { name: "Vaciar carrito" }).click();

  await expect(
    page.getByRole("heading", { name: "Tu carrito está vacío" }),
  ).toBeVisible();
});
