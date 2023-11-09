export type LoginForm = {
  login: string;
  password: string;
};

export interface RegistrationForm {
  name: string;
  login: string;
  password: string;
};

export interface SearchForm {
  search: string,
  showNonActive: boolean,
  category: string | null
};