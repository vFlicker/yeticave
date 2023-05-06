import { Request, Response } from 'express';
import path from 'path';

import { ModelFactoryService } from './modelFactory.service';

export class BaseController {
  protected dirname = '';
  protected modelFactoryService: ModelFactoryService;

  constructor(modelFactoryService: ModelFactoryService) {
    this.modelFactoryService = modelFactoryService;
  }

  public redirect(res: Response, path: string): void {
    res.redirect(path);
  }

  // TODO: createAuthUser?
  // const user = new AuthUser(req.session);

  public render(res: Response, fileName: string, data: object): void {
    const view = this.getView(fileName);
    res.render(view, data);
  }

  public getParam(req: Request, name: string): string {
    const value = req.params[name];
    return value;
  }

  private getView(fileName: string): string {
    return path.resolve(this.dirname, 'views', fileName);
  }
}
