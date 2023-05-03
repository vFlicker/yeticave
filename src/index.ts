import bodyParser from 'body-parser';
import cookies from 'cookie-parser';
import dotenv from 'dotenv';
import ejs from 'ejs';
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import { auth } from 'express-openid-connect';
import session from 'express-session';
import nodemailer from 'nodemailer';
import path from 'path';

import {
  authenticateUser,
  defaultTemplateVariables,
  ROOT_PREFIX,
} from './common';
import { betRouter } from './modules/bet';
import { historyRouter } from './modules/history';
import { homeRouter } from './modules/home';
import { lotRouter } from './modules/lot';
import { searchRouter } from './modules/search';
import { User, userRouter } from './modules/user';

declare module 'express-session' {
  interface SessionData {
    user: User | null;
  }
}

dotenv.config();

const app = express();

// Auth
app.use(
  auth({
    issuerBaseURL: 'https://dev-rzs8b6dr2jwg2eu2.us.auth0.com',
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  }),
);

// Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Set cookies
app.use(cookies());

// Set session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }),
);

// middlewares
app.use(authenticateUser);
app.use(defaultTemplateVariables);

// Static Files
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', [
  path.resolve(__dirname, 'common', 'views'),
  path.resolve(__dirname, 'modules'),
]);
app.set('layout', 'layouts/layout.ejs');
app.use(ejsLayouts);

app.get('/', (req: any, res) => {
  console.log(req.user);
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Add routing
app.use(ROOT_PREFIX, homeRouter);
app.use(ROOT_PREFIX, userRouter);
app.use(ROOT_PREFIX, historyRouter);
app.use(ROOT_PREFIX, lotRouter);
app.use(ROOT_PREFIX, betRouter);
app.use(ROOT_PREFIX, searchRouter);

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: Number(process.env.MAILER_PORT),
  secure: process.env.MAILER_SECURE === 'true',
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
  tls: {
    rejectUnauthorized: process.env.MAILER_REJECTUNAUTHORIZED === 'true',
  },
});

app.get('/send-email', (_, res) => {
  const messagePath = path.resolve(
    __dirname,
    'common',
    'views',
    'messages',
    'email.ejs',
  );
  ejs.renderFile(
    messagePath,
    { name: 'Vlad', lotId: 3, title: 'Lot name' },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const mailOptions = {
          from: process.env.MAILER_USER,
          to: 'flickervladislav@yandex.com',
          subject: 'You won. YatiCave auction.',
          html: data,
        };

        transporter.sendMail(mailOptions, (error) => {
          if (error) console.log({ error });
          res.send(`send email success`);
        });
      }
    },
  );
});

app.get('*', (_, res) => {
  res.status(404).send('Not Found');
});

// Set up server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
