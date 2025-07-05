export interface Post {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  profileImage: string;
  author: string;
  likes:  string[];
  comments: number;
  shares: number;
} 

type User = {
  _id: string;
  username: string;
  profilePic?: string;
  fullName?: string;
};

export type Comment = {
  _id: string;
  content: string;
  user: User;
};
