import FeaturedPosts from "@/Components/FeaturedPosts/FeaturedPosts";
import Hero from "@/Components/Hero/Hero";
import MeetGini from "@/Components/MeetGini/MeetGini";
import TagsCloud from "@/Components/TagsCloud/TagsCloud";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <FeaturedPosts /> */}
      <TagsCloud />
      <MeetGini />
    </>
  );
}
