import { unHashPassword } from '@libs/utils';
import { User } from '@models/user';
import passport from 'passport';
import {
  IStrategyOptionsWithRequest,
  Strategy as LocalStrategy,
} from 'passport-local';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';

const localStrategyOptions: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const jwtStrategyOption: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_SECRET!,
};

const localLoginStrategy = new LocalStrategy(
  localStrategyOptions,
  (req, email, password, done) => {
    email = req.body.email.toLowerCase().trim();
    password = req.body.password;
    User.findOne({
      where: { email },
      logging: false,
    })
      .then((user) => {
        if (!user) return done({ message: 'Invalid email' });
        if (!unHashPassword(password, user.password))
          return done({ message: 'Invalid password' });
        if (!user.isActive) {
          let msg = 'You are not allowed to access the system. ';
          msg += "Please contact the Administrator. He'll let you in";
          return done({ message: msg });
        }
        user = user.toJSON() as User;
        return done(null, user);
      })
      .catch((error) => done(error));
  },
);

const jwtLoginStrategy = new JwtStrategy(
  jwtStrategyOption,
  (jwtPayload, done) => {
    User.findByPk(jwtPayload.id)
      .then((user) => done(null, user))
      .catch((error) => done(error));
  },
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id: string, done) => {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch((error) => done(error));
});

passport.use('local', localLoginStrategy);
passport.use(jwtLoginStrategy);

export default passport;
