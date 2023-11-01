export interface IRegisterPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IUserState {
  userId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  access: string;
  phone: string;
}

export interface IAuthState {
  token: string | null;
  authenticated: boolean;
  updatedOn: Date | null;
}
