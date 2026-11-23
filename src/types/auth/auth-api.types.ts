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

export type OtpVerificationPayload = {
  email: string;
  otp: string;
};

export type UpdateProfilePayload = {
  userId: string;
  name?: string;
  phone?: string;
  image?: File;
};
