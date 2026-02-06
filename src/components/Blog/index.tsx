import React from 'react';
import BlogCard from '@/components/shared/Blog/blogCard';
import { getBlogPosts } from '@/lib/queries/content';

interface Blog {
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    slug: string;
    detail: string;
    tag: string;
}

const BlogList = async () => {
    const posts: Blog[] = (await getBlogPosts()).map((item) => ({
        title: item.title,
        date: item.date,
        excerpt: item.excerpt,
        coverImage: item.coverImage,
        slug: item.slug,
        detail: item.detail,
        tag: item.tag,
    }));

    return (
        <section className='pt-0!'>
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
                    {posts.map((blog, i) => (
                        <div key={i} className="w-full">
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BlogList;
