import { NextFunction, Request, Response } from 'express';
import path from 'path';

export class BaseController {
  protected dirname = '';

  public redirect(res: Response, path: string) {
    res.redirect(path);
  }

  // public beforeAction(req: Request, res: Response, next: NextFunction) {
  //   const user = new AuthUser(req.session);
  //   user.proceedAuth();

  //   const { guest, user: userRules } = this.rules;
  //   const rules = user.isGuest() ? guest : userRules;

  //   if (rules.includes(req.url)) {
  //     return this.redirect(res, '/');
  //   }

  //   this.templateData.user = user;
  //   next();
  // }

  public render(res: Response, fileName: string, data: object) {
    // TODO: fix it
    // const templateData = { ...this.templateData, ...data };

    const view = this.getView(fileName);
    res.render(view, data);
  }

  public getParam(req: Request, name: string) {
    const value = req.params[name];
    return value;
  }

  private getView(fileName: string) {
    return path.resolve(this.dirname, 'views', fileName);
  }
}
