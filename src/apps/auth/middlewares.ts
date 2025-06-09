import { serverResponse } from '@libs/server';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (error: any, user: AUTH.IUser, info: any) => {
      console.log({ error, user, info });

      if (error) return serverResponse(res, 500, 'Service not available');
      if (!user) return serverResponse(res, 401, 'Unauthorized');

      req.user = user;
      return next();
    },
  )(req, res, next);
};
