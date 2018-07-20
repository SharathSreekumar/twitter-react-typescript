import app from './App';

const portEnv = process.env.APP_SERVER_PORT || 8000;

app.listen(portEnv, () => {
  return console.info(`Server is listening on ${portEnv}`);
});