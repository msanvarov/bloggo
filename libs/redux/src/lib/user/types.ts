export interface IUserState {
  user?: Partial<IUser> | null;
  username?: string | null;
}

export interface IUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  createdAt?: string;
  lastLoginAt?: string;
}
