export type UserRole = 'USER' | 'MERCHANT' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  name?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}
