import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: import('./modules/user/interfaces/user.interface').User;
  }
}
