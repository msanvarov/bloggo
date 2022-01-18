export interface IFirestoreUserData {
  username: string;
  displayName: string;
  photoURL: string;
  createdAt: number;
}

export interface IFirestoreUsernameData {
  username: string;
  uid: string;
  createdAt: number;
}

export interface IFirestorePostData {
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
  description: string;
  likes: number;
}
