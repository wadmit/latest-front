import { remark } from "remark";
import html from "remark-html";
import mdx from "remark-mdx";
import frontmatter from "remark-frontmatter";

export default async function markdownToHtml(markdown: any) {
  const result = await remark()
    .use(frontmatter, ["yaml"])
    .use(mdx)
    .use(html)
    .process(markdown);
  return result.toString();
}
