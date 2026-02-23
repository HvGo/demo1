import React, { FC } from "react";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard: FC<{ blog: Blog }> = ({ blog }) => {
    const { title, coverImage, date, slug, tag } = blog;
    
    const imageUrl = coverImage 
        ? (coverImage.startsWith('http') ? coverImage : `https://admin.datans.work${coverImage}`)
        : '/images/placeholder.jpg';
    
    return (
        <Link href={`/blogs/${slug}`} className="group h-full flex flex-col">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl flex-shrink-0 mb-4 sm:mb-5 bg-gray-100 dark:bg-gray-800">
                <Image
                    src={imageUrl}
                    alt={title || 'Blog post'}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover transition duration-300 group-hover:scale-105"
                    width={400}
                    height={250}
                    unoptimized={true}
                />
            </div>
            <div className="flex flex-col flex-grow">
                <div className="mb-3 sm:mb-4">
                    <div className="inline-block py-1.5 sm:py-2 px-3 sm:px-4 bg-primary/10 dark:bg-primary/20 rounded-full mb-3">
                        <p className="text-xs sm:text-sm font-semibold text-primary dark:text-primary">
                            {tag}
                        </p>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-dark dark:text-white group-hover:text-primary transition duration-300 line-clamp-2">
                        {title}
                    </h3>
                </div>
                <div className="mt-auto">
                    <span className="text-sm sm:text-base font-medium text-dark/60 dark:text-white/60">
                        {format(new Date(date), "MMM dd, yyyy")}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
