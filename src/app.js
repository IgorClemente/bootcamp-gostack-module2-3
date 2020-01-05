import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import Youch from 'youch';
import routes from './routes';

import sentryConfig from './config/sentry';
import './database';

class App {
  constructor() {
    Sentry.init(sentryConfig);
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const youchErr = new Youch(err, req).toJSON();
        res.status(500).json(youchErr);
      }
      return res.status(500).json('Internal server error');
    });
  }
}

export default new App().server;
