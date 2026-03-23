export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginInterface extends Omit<
  RegisterInterface,
  'name' | 'password_confirmation'
> {}
