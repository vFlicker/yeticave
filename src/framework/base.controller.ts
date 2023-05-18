import { Request, Response } from 'express';
import path from 'path';

import { ModelFactoryService } from './modelFactory.service';

interface ErrorData {
  pageTitle: string;
  title: string;
  text: string;
}

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

  public renderError(
    res: Response,
    error: unknown,
    data: ErrorData = {
      pageTitle: 'Something went wrong',
      title: 'Something went wrong',
      text: 'Try later.',
    },
  ): void {
    console.error(error);

    res.render('pages/error', data);
  }

  public getCookie<T>(req: Request, key: string): T {
    const data = JSON.parse(req.cookies[key] || '[]');
    return data;
  }

  public getUri(req: Request): string {
    return req.originalUrl;
  }

  public getQuery<T>(req: Request, name: string): T {
    const value = req.query[name] as unknown as T;
    return value;
  }

  public getParam(req: Request, name: string): string {
    const value = req.params[name];
    return value;
  }

  public getCurrentPage(req: Request): number {
    const page = this.getQuery<number | undefined>(req, 'page');
    const currentPage = page ? Number(page) : 1;
    return currentPage;
  }

  private getView(fileName: string): string {
    return path.resolve(this.dirname, 'views', fileName);
  }
}
