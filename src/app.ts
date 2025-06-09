import express from 'express';
import 'dotenv/config';
import { bootstrap } from '@configs/helper';

const app = express();
const PORT = process.env.PORT || 3000;

bootstrap();

app.get('/', (req, res) => {
  res.send('Hello from TypeScript Express!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
