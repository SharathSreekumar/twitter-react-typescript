import * as express from 'express';
import * as path from 'path';
import * as Raven from 'raven';

import app from './App';

const portEnv = process.env.PORT || process.argv[2] || process.env.APP_SERVER_PORT || 8000;

app.use(express.static(path.join(__dirname, '/web')));
app.use(Raven.errorHandler());
app.use((err, req, res, next) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

app.listen(portEnv, () => {
  return console.info(`Server is listening on ${portEnv}`);
});