import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import path from 'path';

import { authenticateUser, defaultTemplateVariables } from './common';
import { ModelFactoryService, Router } from './framework';
import { User } from './modules/user';

declare module 'express-session' {
  interface SessionData {
    user: User | null;
  }
}

export class App {
  app: Express;

  constructor() {
    dotenv.config();
    this.app = express();

    this.setup();
  }

  public setRoutes(routes: Router, modelFactory: ModelFactoryService): void {
    for (const route of routes) {
      const { path, action, className, method } = route;

      const controller = new className(modelFactory);
      this.app[method](path, controller[action]);
    }
  }

  public run() {
    const port = process.env.PORT;
    const text = `⚡️ [server]: Server is running at http://localhost:${port}`;

    this.app.listen(port, () => console.log(text));
  }

  private setup() {
    this.setupParsers();
    this.setupSession();
    this.applyMiddlewares();
    this.setupViewEngine();

    // const transporter = nodemailer.createTransport({
    //   host: process.env.MAILER_HOST,
    //   port: Number(process.env.MAILER_PORT),
    //   secure: process.env.MAILER_SECURE === 'true',
    //   auth: {
    //     user: process.env.MAILER_USER,
    //     pass: process.env.MAILER_PASS,
    //   },
    //   tls: {
    //     rejectUnauthorized: process.env.MAILER_REJECTUNAUTHORIZED === 'true',
    //   },
    // });
    // this.app.get('/send-email', (_, res) => {
    //   const messagePath = path.resolve(
    //     __dirname,
    //     'common',
    //     'views',
    //     'messages',
    //     'email.ejs',
    //   );
    //   ejs.renderFile(
    //     messagePath,
    //     { name: 'Vlad', lotId: 3, title: 'Lot name' },
    //     (err, data) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         const mailOptions = {
    //           from: process.env.MAILER_USER,
    //           to: 'flickervladislav@yandex.com',
    //           subject: 'You won. YatiCave auction.',
    //           html: data,
    //         };
    //         transporter.sendMail(mailOptions, (error) => {
    //           if (error) console.log({ error });
    //           res.send(`send email success`);
    //         });
    //       }
    //     },
    //   );
    // });
    // this.app.get('*', (_, res) => {
    //   res.status(404).send('Not Found');
    // });
  }

  private setupParsers() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded());
    this.app.use(cookieParser());
  }

  private setupSession() {
    this.app.use(
      session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
      }),
    );
  }

  private applyMiddlewares() {
    this.app.use(authenticateUser);
    this.app.use(defaultTemplateVariables);
  }

  private setupViewEngine() {
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
