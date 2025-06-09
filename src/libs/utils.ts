import bcrypt from 'bcryptjs';

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(Number(process.env.PASS_SALT || 1));
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};
export const unHashPassword = (password: string, hashedPass: string) => {
  return bcrypt.compareSync(password, hashedPass);
};
