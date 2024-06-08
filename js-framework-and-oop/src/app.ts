import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Express, RequestHandler } from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import path from 'path';

import { authenticateUser, defaultTemplateVariables } from './common';
import { BaseController, ModelFactoryService, Router } from './framework';

export class App {
  app: Express;

  constructor() {
    dotenv.config();
    this.app = express();
    this.setup();
  }

  public setRoutes(routes: Router, modelFactory: ModelFactoryService): void {
    for (const route of routes) {
      const { path, action, className, method, middlewares = [] } = route;

      const controller = new className(modelFactory);

      const requestHandler = controller[
        action as keyof BaseController
      ] as RequestHandler;

      this.app[method](path, middlewares, requestHandler);
    }
  }

  public run() {
    const port = process.env.PORT;
    const text = `⚡️ [server]: Server is running at http://localhost:${port}`;

    this.app.listen(port, () => console.log(text));
  }

  private setup() {
    this.setParsers();
    this.setSession();
    this.setMiddlewares();
    this.setViewEngine();
  }

  private setParsers() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded());
    this.app.use(cookieParser());
  }

  private setSession() {
    this.app.use(
      session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
      }),
    );
  }

  private setMiddlewares() {
    this.app.use(authenticateUser);
    this.app.use(defaultTemplateVariables);
  }

  private setViewEngine() {
    this.app.use(express.static('public'));
    this.app.use(expressEjsLayouts);

    this.app.set('view engine', 'ejs');

    this.app.set('views', [
      path.resolve(__dirname, 'common', 'views'),
      path.resolve(__dirname, 'modules'),
    ]);

    this.app.set('layout', 'layouts/layout.ejs');
  }
}
