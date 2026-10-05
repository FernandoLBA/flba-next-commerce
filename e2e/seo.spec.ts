import { expect, test } from "@playwright/test";

test("el detalle expone metadata dinámica y datos estructurados", async ({
  page,
}) => {
  await page.goto("/products/1");

  const title = (await page.getByRole("heading", { level: 1 }).textContent()) ?? "";

  await expect(page).toHaveTitle(`${title} | FLBA Store`);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    title,
  );
  await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
    "content",
    /^https:\/\//,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/products\/1$/,
  );

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .textContent();

  expect(JSON.parse(jsonLd ?? "{}")).toMatchObject({
    "@type": "Product",
    name: title,
    offers: { "@type": "Offer" },
  });
});

test("los productos son enlaces rastreables, no botones", async ({ page }) => {
  await page.goto("/products");

  const hrefs = await page
    .locator("article")
    .getByRole("link")
    .evaluateAll((links) => links.map((l) => l.getAttribute("href")));

  expect(hrefs.length).toBeGreaterThan(0);
  hrefs.forEach((href) => expect(href).toMatch(/^\/products\/\d+$/));
});
