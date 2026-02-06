import Testimonial from "@/components/Home/Testimonial";
import { getTestimonials } from "@/lib/queries/content";

export default async function TestimonialSection() {
  const testimonials = await getTestimonials();
  return <Testimonial testimonials={testimonials} />;
}
