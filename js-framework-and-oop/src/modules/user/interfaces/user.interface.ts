import { Id } from '../../../common';

export interface User {
  id: Id;
  email: string;
  name: string;
  password: string;
  avatarUrl: string;
  contacts: string;
}
