export interface Post {
  id?: number;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  profileImage: string;
  author: string;
  likes: number;
  comments: number;
  shares: number;
} 