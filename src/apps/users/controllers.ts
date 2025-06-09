import { Request, Response } from 'express';
import { createUser } from './services';
import { serverResponse } from '@libs/server';
import { hashPassword } from '@libs/utils';

export const addUser = async (req: Request, res: Response) => {
  req.body.password = hashPassword(req.body.password);
  const newUser = await createUser(req.body);

  serverResponse(res, 201, 'Success', newUser);
};
