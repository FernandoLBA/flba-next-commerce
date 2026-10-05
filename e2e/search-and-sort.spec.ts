import { expect, type Page, test } from "@playwright/test";

const searchBox = (page: Page) =>
  page.getByRole("searchbox", { name: "Buscar productos" });
const sortSelect = (page: Page) =>
  page.getByRole("combobox", { name: "Ordenar por" });

const cardPrices = async (page: Page) =>
  (await page.locator("article .typo-price").allTextContents()).map((text) =>
    Number(text.replace(/[^\d.]/g, "")),
  );

const isSorted = (values: number[], direction: "asc" | "desc") =>
  values.length > 1 &&
  values.every(
    (value, i) =>
      i === 0 ||
      (direction === "asc" ? values[i - 1] <= value : values[i - 1] >= value),
  );

test("buscar y ordenar por precio, todo en la URL", async ({ page }) => {
  await page.goto("/products");

  await searchBox(page).fill("phone");
  await searchBox(page).press("Enter");
  await expect(page).toHaveURL(/q=phone/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Resultados para «phone»",
  );

  await sortSelect(page).selectOption({ label: "Precio: menor a mayor" });
  await expect(page).toHaveURL(/sortBy=price&order=asc/);
  await expect.poll(async () => isSorted(await cardPrices(page), "asc")).toBe(true);

  await sortSelect(page).selectOption({ label: "Precio: mayor a menor" });
  await expect(page).toHaveURL(/order=desc/);
  await expect.poll(async () => isSorted(await cardPrices(page), "desc")).toBe(true);
});

test("cambiar de categoría conserva la búsqueda y el orden", async ({ page }) => {
  await page.goto("/products?q=phone&sortBy=price&order=asc");

  await page
    .getByRole("complementary", { name: "Categorías" })
    .getByRole("link", { name: "Smartphones" })
    .click();

  await expect(page).toHaveURL(/category=smartphones/);
  await expect(page).toHaveURL(/q=phone/);
  await expect(page).toHaveURL(/sortBy=price&order=asc/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Resultados para «phone»",
  );
});

test("una URL con búsqueda y orden se puede compartir", async ({ page }) => {
  await page.goto("/products?q=phone&sortBy=price&order=asc");

  await expect(searchBox(page)).toHaveValue("phone");
  await expect(sortSelect(page)).toHaveValue("price:asc");
  expect(isSorted(await cardPrices(page), "asc")).toBe(true);
});

test("una búsqueda sin resultados muestra un estado vacío con salida", async ({
  page,
}) => {
  await page.goto("/products?q=zzzzqq");

  await expect(page.getByRole("status")).toContainText(
    "No hay resultados para «zzzzqq»",
  );
  await expect(searchBox(page)).toBeVisible();

  await page.getByRole("link", { name: "Quitar la búsqueda" }).click();

  await expect(page).toHaveURL(/\/products$/);
  await expect(page.locator("article").first()).toBeVisible();
});

test("la búsqueda y el orden no se indexan; el listado normal sí", async ({
  page,
}) => {
  await page.goto("/products?q=phone&sortBy=price&order=asc");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/products$/,
  );

  await page.goto("/products");
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});
