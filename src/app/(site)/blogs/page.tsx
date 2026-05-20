import BlogList from "@/components/Blog";
import BlogHeroSection from "@/components/Blog/HeroSection";
import { Metadata } from "next";
import { FloatingBubbles } from "@/components/Home/FloatingBubbles";

export const revalidate = 60;

export const metadata: Metadata = {
    title:
        "Blog Grids | Homely ",
};

const Blog = () => {
    return (
        <>
            <BlogHeroSection
                title="Real estate insights."
                description="Stay ahead in the property market with expert advice and updates."
            />
            <BlogList />
            <FloatingBubbles />
        </>
    );
};

export default Blog;
