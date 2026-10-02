export type UserLoginPayload = {
  email: string;
  password: string;
};

export type UserRegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};
