import { User } from './User.interface';

export interface Team {
  _id: string;
  name: string;
  members: User[];
}
