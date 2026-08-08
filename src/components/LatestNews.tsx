import { useState, useEffect } from 'react';
import { StickyLatestSection, CardData } from "./ui/sticky-scroll-cards-section";
import { getPosts, WPPost } from "../services/wordpress";

const LatestNews = () => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(2);
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch WordPress posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading || posts.length === 0) {
    return <StickyLatestSection />;
  }

  // Map WP Posts to Card Data
  const mapToCard = (post: WPPost): CardData => {
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredMedia?.source_url || "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2070&auto=format&fit=crop";
    
    // Clean up title and excerpt from HTML tags
    const title = post.title.rendered.replace(/<\/?[^>]+(>|$)/g, "");
    const description = post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150) + "...";

    return {
      subtitle: "LATEST NEWS",
      title: title,
      description: description,
      detail: "Read more on our blog.",
      tagline: "Stay updated with The Pad.",
      buttonLabel: "Read Post",
      images: [imageUrl],
      thumbImage: imageUrl
    };
  };

  const creamCard = mapToCard(posts[0]);
  const darkCard = posts[1] ? mapToCard(posts[1]) : undefined;

  return <StickyLatestSection creamCard={creamCard} darkCard={darkCard} />;
};

export default LatestNews;
