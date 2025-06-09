import express from 'express';
import compression from 'compression';
import passport from '@configs/passportConfig';
import cors from 'cors';
import 'dotenv/config';
import { bootstrap } from '@configs/helper';
import { session } from '@configs/session';
import { corseOptions, applySecurity } from '@configs/security';

const app = express();
const PORT = process.env.PORT || 3000;

bootstrap();

app.use(cors(corseOptions));
applySecurity(app);
app.use(compression());
app.use(
  express.urlencoded({
    limit: '100mb',
    parameterLimit: 100000,
    extended: false,
  }),
);
app.use(express.json({ limit: '100mb' }));

/**
 * Initialize passport and session
 */
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello from TypeScript Express!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
