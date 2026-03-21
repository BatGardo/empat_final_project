export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface LoginInterface extends Omit<
  RegisterInterface,
  'name' | 'confirm_password'
> {}
