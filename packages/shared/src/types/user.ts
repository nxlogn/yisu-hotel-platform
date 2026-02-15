export enum UserRole {
  USER = 'USER',
  MERCHANT = 'MERCHANT',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;
  email: string;
  name?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string | Date;
}
