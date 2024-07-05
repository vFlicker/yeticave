import { Router } from 'express';

export const myRouter = Router();

myRouter.get('/profile', (req, res) => res.render('pages/my/profile'));
myRouter.get('/subscriptions', (req, res) => {
  res.render('pages/my/subscriptions');
});
myRouter.get('/watchlist', (req, res) => res.render('pages/my/watchlist'));
myRouter.get('/my-bets', (req, res) => res.render('pages/my/my-bets'));
