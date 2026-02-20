import { getBlogPostBySlug } from "@/lib/queries/content";
import { getBlogPostBySlugWithMetadata } from "@/lib/queries/blog";
import { BlogPostSchema } from "@/components/Blog/BlogPostSchema";
import markdownToHtml from "@/components/utils/markdownToHtml";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Icon } from '@iconify/react'

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: any) {
    const data = await params;
    const post = await getBlogPostBySlug(data.slug);

    const siteName = process.env.SITE_NAME || "Your Site Name";
    const authorName = process.env.AUTHOR_NAME || "Your Author Name";

    if (post) {
        const metadata = {
            title: `${post.title || "Single Post Page"} | ${siteName}`,
            author: authorName,
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                    index: true,
                    follow: false,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
        };

        return metadata;
    } else {
        return {
            title: "Not Found",
            description: "No blog article has been found",
            author: authorName,
            robots: {
                index: false,
                follow: false,
                nocache: false,
                googleBot: {
                    index: false,
                    follow: false,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
        };
    }
}

export default async function Post({ params }: any) {
    const data = await params;
    const post = await getBlogPostBySlug(data.slug);
    const postWithMetadata = await getBlogPostBySlugWithMetadata(data.slug);
    
    if (!post) {
        return null;
    }

    const content = await markdownToHtml(post.content || "");

    return (
        <>
            {postWithMetadata && <BlogPostSchema post={postWithMetadata} baseUrl={process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"} />}
            
            <section className="relative pt-20 sm:pt-28 lg:pt-36 pb-0">
                <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6 sm:space-y-8">
                        <Link href="/blogs" className="inline-flex items-center gap-2 sm:gap-3 text-white bg-primary hover:bg-primary/90 py-2.5 sm:py-3 px-4 sm:px-5 rounded-full transition duration-300 text-sm sm:text-base">
                            <Icon
                                icon={'ph:arrow-left'}
                                width={18}
                                height={18}
                                className='sm:w-5 sm:h-5'
                            />
                            <span>Go Back</span>
                        </Link>
                        
                        <div className="space-y-4 sm:space-y-6">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold text-dark dark:text-white">
                                {post.title}
                            </h1>
                            <p className="text-base sm:text-lg text-dark/70 dark:text-white/70 leading-relaxed">
                                {post.detail}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8 pt-4 sm:pt-6 border-t border-dark/10 dark:border-white/10">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <Image
                                    src={post.authorImage}
                                    alt={post.author}
                                    className="rounded-full w-12 h-12 sm:w-14 sm:h-14 object-cover"
                                    width={56}
                                    height={56}
                                    quality={100}
                                    unoptimized={true}
                                />
                                <div>
                                    <p className="text-sm sm:text-base font-semibold text-dark dark:text-white">
                                        {post.author}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                <div className="flex items-center gap-2 sm:gap-3 text-dark dark:text-white">
                                    <Icon
                                        icon={'ph:clock'}
                                        width={18}
                                        height={18}
                                        className='sm:w-5 sm:h-5'
                                    />
                                    <span className="text-sm sm:text-base font-medium">
                                        {format(new Date(post.date), "MMM dd, yyyy")}
                                    </span>
                                </div>
                                <div className="inline-block py-1.5 sm:py-2 px-3 sm:px-4 bg-primary/10 dark:bg-primary/20 rounded-full">
                                    <p className="text-xs sm:text-sm font-semibold text-primary">{post.tag}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 sm:mt-12 lg:mt-16 overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={1170}
                            height={660}
                            quality={100}
                            priority
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </section>
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                        <div className="blog-details markdown space-y-6 sm:space-y-8">
                            <div dangerouslySetInnerHTML={{ __html: content }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
