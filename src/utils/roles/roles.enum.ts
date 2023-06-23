export enum Role {
    User = 'user',
    Admin = 'admin',
  }
  
export const permissions = {
    [Role.Admin]: ['create', 'read', 'update', 'delete'],
    [Role.User]: ['read'],
  };