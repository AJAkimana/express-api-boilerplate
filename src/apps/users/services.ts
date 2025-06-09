import { User } from '@models/user';

export const createUser = async (user: Partial<AUTH.IUser>) => {
  return User.findOrCreate({ where: { email: user.email }, defaults: user });
};
