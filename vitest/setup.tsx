import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

/* eslint-disable @typescript-eslint/no-unused-vars -- se descartan props que no son del <img> */
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill: _fill,
    priority: _priority,
    sizes: _sizes,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} {...props} />
  ),
}));

/* eslint-enable @typescript-eslint/no-unused-vars */
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn() })),
}));
