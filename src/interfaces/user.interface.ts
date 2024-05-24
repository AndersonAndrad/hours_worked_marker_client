import { Team } from './team.interface';

export interface User {
  _id: string;
  name: string;
  userHash: string;
  nickName: string;
  email: string;
  password: string;
  roles: Role[];
  team: Omit<Team, 'members'>[];
  blocked: boolean;
}

export interface SingIn extends Omit<User, '_id' | 'userHash' | 'roles' | 'team' | 'blocked'> {}

export interface Role {
  _id: string;
  name: string;
  permissions: Permission[];
  blocked: boolean;
}

export interface Permission {
  _id: string;
  resource: string;
  action: Action[];
  blocked: boolean;
}

export enum Action {
  CREATE = 'create',
  DELETE = 'delete',
  VIEW = 'view',
  EDIT = 'edit',
}
