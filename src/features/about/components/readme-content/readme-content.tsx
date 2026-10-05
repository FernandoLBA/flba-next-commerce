import "server-only";

import { AppLink } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { appSettings } from "@/shared/constants/app.settings";
import { readFile } from "node:fs/promises";
import path from "node:path";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const README_PATH = path.join(process.cwd(), "README.md");
const BLOB_URL = `${appSettings.REPO_URL}/blob/main/`;

const resolveHref = (href = "") =>
  /^(https?:|mailto:|#)/.test(href)
    ? href
    : `${BLOB_URL}${href.replace(/^\.?\//, "")}`;

const components: Components = {
  h1: ({ children }) => <h2>{children}</h2>,
  
  a: ({ href, children }) => {
    const resolved = resolveHref(href);
    const isAnchor = resolved.startsWith("#");

    return (
      <a
        href={resolved}
        {...(!isAnchor && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
};

export const ReadmeContent = async () => {
  const markdown = await readFile(README_PATH, "utf8").catch(() => null);

  if (markdown === null) {
    return (
      <p className="typo-body text-muted">
        {appMessages.ABOUT.README_ERROR}{" "}
        <AppLink href={appSettings.REPO_URL} target="_blank" rel="noopener noreferrer">
          {appMessages.ABOUT.REPO_CTA}
        </AppLink>
      </p>
    );
  }

  return (
    <article className="prose prose-theme max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
};
