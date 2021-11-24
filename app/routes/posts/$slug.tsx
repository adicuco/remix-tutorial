import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";

import { getPost } from "~/posts";

export let loader: LoaderFunction = async ({ params: { slug } }) => {
  invariant(slug, "expected params.slug");
  return getPost(slug);
};

export default function PostSlug() {
  const post = useLoaderData();

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}
