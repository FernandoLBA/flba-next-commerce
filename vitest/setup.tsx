import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    fill,
    priority,
    sizes,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
  }) => (
    <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} {...props} />
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),

  useSearchParams: vi.fn(() => new URLSearchParams()),
  
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn() })),
}));
