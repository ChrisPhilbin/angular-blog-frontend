// export interface Post {
//   id: number;
//   date: string;
//   link: string;
//   title: {
//     rendered: string;
//   };
//   content: {
//     rendered: string;
//   };
//   excerpt: {
//     rendered: string;
//   };
// }

export interface Post {
  category: string;
  body: string;
  createdAt: string;
  title: string;
  postId: string;
}
