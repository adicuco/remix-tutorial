import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { processMarkdown } from "@ryanflorence/md";

export type Post = {
  slug: string;
  title: string;
  html?: string;
  markdown: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

const postsPath = path.join(__dirname, "../posts");

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());

  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );

  const html = await processMarkdown(body);

  return { slug, html, title: attributes.title, markdown: body };
}

export async function getPosts() {
  const dir = await fs.readdir(postsPath);

  return Promise.all(
    dir.map(async (filename) => {
      const filepath = path.join(postsPath, filename);
      const file = await fs.readFile(filepath);
      const { attributes } = parseFrontMatter(file.toString());

      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );

      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title,
      };
    })
  );
}

export async function createPost(post: Post) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;

  await fs.writeFile(path.join(postsPath, post.slug + ".md"), md);

  return getPost(post.slug);
}

export async function updatePost(post: Post) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;

  await fs.writeFile(path.join(postsPath, post.slug + ".md"), md);

  return getPost(post.slug);
}
