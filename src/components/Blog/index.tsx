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
        <section className='py-16 sm:py-20 lg:py-24'>
            <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
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
