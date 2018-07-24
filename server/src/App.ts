import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as Raven from 'raven';
import * as controllers from './controllers/index';

// Raven.config('__DSN__').install();
Raven.config(`https://${process.env.NODE_APP_SENTRY_TRACKER_KEY}@sentry.io/1248681`, { sendTimeout: 5 }).install();

class App {
  public express: any;

  constructor() {
    this.express = express();
    if (process.env.NODE_ENV === 'development') {
      this.express.use(
        logger((tokens, req, res) => `{
          method: ${tokens.method(req, res)},
          url: ${tokens.url(req, res)},
          status: ${tokens.status(req, res)},
          content-length: ${tokens.res(req, res, 'content-length')},
          response-time: ${tokens['response-time'](req, res)} ms
        }`)
      );
    }

    // The request handler must be the first middleware on the app
    this.express.use(Raven.requestHandler());

    this.express.use(cors());
    this.mountRoutes();
    this.mountAPIRoutes();
  }

  private mountRoutes(): void {
    // Sentry work test
    /* this.express.get('/',(req, res) => {
        throw new Error('Sentry Break Test!');
    }); */

    this.express.get('/', (req: any, res: any) => {
      res.status(200).json({ message: 'Hello World!' });
    });
  }

  private mountAPIRoutes(): void {
    // Neutralize API endpoint uris for client and proxy API calls to different platforms
    const apiRouter = express.Router();

    apiRouter
      .route('/status')
      .get(controllers.statusHandler);

    apiRouter
      .route('/get-tweets')
      .get(controllers.fetchTwitterHandler);


    // bodyParser is used to render `body` data(ContentType: 'application/json'
    // or 'application/x-www-form-urlencoded') from the request `BODY`
    this.express.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.express.use(bodyParser.json());
    this.express.use('/bapi/', apiRouter); // bapi -> Backend API
  }
}

export default new App().express;