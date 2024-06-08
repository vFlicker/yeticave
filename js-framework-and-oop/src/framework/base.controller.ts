import { Request, Response } from 'express';
import { SessionData } from 'express-session';
import path from 'path';

import { APP_TITLE } from '../common';
import { ModelFactoryService } from './modelFactory.service';

interface ErrorData {
  pageTitle: string;
  title: string;
  text: string;
}

export class BaseController {
  protected dirname = '';
  protected modelFactoryService: ModelFactoryService;
  protected pageTitle = '';

  constructor(modelFactoryService: ModelFactoryService) {
    this.modelFactoryService = modelFactoryService;
  }

  public getTitle() {
    if (this.pageTitle) {
      return `${this.pageTitle} | ${APP_TITLE}`;
    }

    return APP_TITLE;
  }

  public redirect(res: Response, path: string): void {
    res.redirect(path);
  }

  public setStatusCode(res: Response, statusCode: number): void {
    res.status(statusCode);
  }

  public render(res: Response, fileName: string, data?: object): void {
    const view = this.getView(fileName);

    res.render(view, { pageTitle: this.getTitle(), helpers: {}, ...data });
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

  public getSession<T extends keyof SessionData>(
    req: Request,
    name: T,
  ): SessionData[T] {
    return req.session[name];
  }

  public getLocal<T>(res: Response, name: string): T {
    return res.locals[name] as T;
  }

  public closeSession<T extends Exclude<keyof SessionData, 'cookie'>>(
    req: Request,
    name: T,
  ): void {
    delete req.session[name];
  }

  public getBody<T>(req: Request): T {
    return req.body as T;
  }

  public getFile(req: Request): Express.Multer.File | undefined {
    return req.file;
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
