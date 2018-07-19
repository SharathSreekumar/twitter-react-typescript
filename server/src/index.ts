import app from './App';

const port = process.env.APP_SERVER_PORT;

app.listen((port: number, err: any) => {
  if (err) {
    return console.error(err);
  }

  return console.info(`Server is listening on ${port}`);
});