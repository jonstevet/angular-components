export interface User {
  id: number;
  email: string;
  name: string;
  lastname?: string;
  password: string;
  avatar?: string;
  description?: string;
  state?: string;
  groups?: string[];
  role?: string[];
}

export interface CreateUser extends Omit<User, 'id' | 'groups' | 'role' | 'state' | 'description' | 'avatar' | 'lastname'>{}
