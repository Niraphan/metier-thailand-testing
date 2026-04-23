import { getBlogBySlug } from "@/data/api/blog.hook";

export default async function Page({ params }: { params: { slug: string } }) {
    const blog = await getBlogBySlug(params.slug);
    return <div>{JSON.stringify(blog.data)}</div>
}