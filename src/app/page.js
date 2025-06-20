import Hero from "@/Components/Hero/Hero";
import MeetGini from "@/Components/MeetGini/MeetGini";
import TagsCloud from "@/Components/TagsCloud/TagsCloud";
import Testimonials from "@/Components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <TagsCloud />
      <MeetGini />
      <Testimonials />
    </>
  );
}
