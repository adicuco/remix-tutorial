import { Link, Outlet, useLoaderData } from "remix";

import { getPosts } from "~/posts";
import type { Post } from "~/posts";
import adminStyles from "~/styles/admin.css";

export let links = () => [{ rel: "stylesheet", href: adminStyles }];

export let loader = () => getPosts();

export default function Admin() {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>

        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
