export interface IUserState {
  user?: Partial<IUser>;
  username?: string;
}

export interface IUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  displayName: string;
  photoURL: string;
  createdAt: string;
  lastLoginAt: string;
}
