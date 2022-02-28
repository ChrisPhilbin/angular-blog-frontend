export interface Post {
  body?: string;
  category?: string;
  id: string;
  postId: string;
  date?: string;
  link?: string;
  title: {
    rendered?: string;
  };
  content: {
    rendered?: string;
  };
  excerpt: {
    rendered?: string;
  };
  createdAt: string;
}

// export interface Post {
//   category: string;
//   body: string;
//   createdAt: string;
//   title: string;
//   postId: string;
// }
