export type LoginForm = {
  login: string;
  password: string;
};

export interface loginDTO {
  token: string
};

export interface RegistrationForm {
  name: string;
  login: string;
  password: string;
};

export interface ChangePasswordForm {
  name: string;
  login: string;
  password: string;
};