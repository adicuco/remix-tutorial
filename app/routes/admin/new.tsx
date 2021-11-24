import { redirect } from "remix";
import type { ActionFunction } from "remix";
import invariant from "tiny-invariant";

import { createPost } from "~/posts";

import PostForm from "~/components/PostForm";

export let action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));

  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors = { title: false, slug: false, markdown: false };
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.values(errors).some((hasError) => !!hasError)) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");

  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function NewPost() {
  return <PostForm />;
}
