import { Form, useActionData, useTransition } from "remix";
import type { Post } from "~/posts";

type PostFormProps = {
  post?: Post;
};

export default function PostForm({ post }: PostFormProps) {
  const errors = useActionData();
  const transition = useTransition();

  if (transition.state === "loading") {
    return <h3>loading...</h3>;
  }

  const buttonText = post
    ? ["Saving...", "Edit Post"]
    : ["Creating...", "Create Post"];

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: {errors?.title && <em>Title is required</em>}
          <input type="text" name="title" defaultValue={post?.title || ""} />
        </label>
      </p>
      <p>
        <label>
          Post Slug: {errors?.slug && <em>Slug is required</em>}
          <input type="text" name="slug" defaultValue={post?.slug || ""} />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown && <em>Markdown is required</em>}
        <br />
        <textarea
          rows={20}
          name="markdown"
          defaultValue={post?.markdown || ""}
        />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? buttonText[0] : buttonText[1]}
        </button>
      </p>
    </Form>
  );
}
