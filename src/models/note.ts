export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
export interface User {
  email: string;
  password: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt?: Date;
}
