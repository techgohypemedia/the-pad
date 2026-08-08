export interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

const API_URL = import.meta.env.VITE_WP_API_URL;

export const getPosts = async (limit = 10): Promise<WPPost[]> => {
  const response = await fetch(`${API_URL}/posts?_embed&per_page=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

export const getPostBySlug = async (slug: string): Promise<WPPost | null> => {
  const response = await fetch(`${API_URL}/posts?_embed&slug=${slug}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  const posts = await response.json();
  return posts.length > 0 ? posts[0] : null;
};

export const getPageBySlug = async (slug: string): Promise<WPPost | null> => {
  const response = await fetch(`${API_URL}/pages?_embed&slug=${slug}`);
  if (!response.ok) throw new Error('Failed to fetch page');
  const pages = await response.json();
  return pages.length > 0 ? pages[0] : null;
};
