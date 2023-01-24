export interface CredentialsModel {
  email?: string | null;
  password?: string | null;
}

export interface UserModel extends CredentialsModel {
  id?: string;
}
