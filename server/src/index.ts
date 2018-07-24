import * as Raven from 'raven';
import app from './App';

const portEnv = process.env.APP_SERVER_PORT || 8000;

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