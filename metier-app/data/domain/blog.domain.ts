import { ApiEnvelope } from "./global.domain";

export interface Blogs {
    blog_id: string;
    title: string;
    short_description: string;
    slug: string;
    thumbnail: string;
    view_amount: number;
    created_at: string;
}

export interface Blog {
    blog_id: string;
    title: string;
    short_description: string;
    description: string;
    slug: string;
    thumbnail: string;
    view_amount: number;
    status: string;
    blog_picture: BlogPicture[];
    blog_comment: BlogComment[];

    created_at: string;
    updated_at: string;
}

export interface BlogPicture {
    blog_picture_id: string;
    blog_id: string;
    picture_url: string;
    created_at: string;
    updated_at: string;
}

export interface BlogComment {
    blog_comment_id: string
    username: string
    comment: string
    created_at: string
    updated_at: string
}

export type BlogResponse = ApiEnvelope<Blogs[]>
export type BlogDetailResponse = ApiEnvelope<Blog>
