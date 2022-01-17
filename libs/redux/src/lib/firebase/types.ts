export interface IFirestoreUserData {
  username: string;
  displayName: string;
  photoURL: string;
}

export interface IFirestorePostsData {
  // author specific data
  uid: string;
  username: string;
  // post specific data
  title: string;
  slug: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  published: boolean;
  thumbnail: string;
  href: string;
  likeCount: number;
}
