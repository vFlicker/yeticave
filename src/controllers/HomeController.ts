import { Request, Response } from 'express';

// TODO: use injection
import { formatPrice, getTimeLeft, isTimeFinishing } from '../common';
// TODO: use injection
import { categories, lots } from '../database';

export class HomeController {
  public index = (req: Request, res: Response) => {
    res.render('pages/home', {
      title: 'Home',
      categories,
      lots,
      helper: {
        formatPrice,
        getTimeLeft,
        isTimeFinishing,
        getLotPath: this.getLotPath,
      },
    });
  };

  private getLotPath(id: number) {
    return `lots/${id}`;
  }
}
