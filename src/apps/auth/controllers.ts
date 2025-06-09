import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Time } from '@libs/constants/time';
import { serverResponse } from '@libs/server';

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: any, user: AUTH.IUser, info: any) => {
      if (err || !user) return serverResponse(res, 400, 'Login failed');

      // Issue JWT
      const token = jwt.sign(user, process.env.APP_SECRET!, {
        expiresIn: Time.week,
      });
      return serverResponse(res, 200, 'Success', token);
    },
  )(req, res, next);
};

export const getUserInfo = (req: Request, res: Response) => {
  serverResponse(res, 200, 'Success', req.user);
};
