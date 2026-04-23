import { getBlogs } from "@/data/api/blog.hook";
import { HomePage } from "@/presentation/home-page/home-page";

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <HomePage blogs={blogs.data} />
  );
}
