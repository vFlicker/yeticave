import { NOT_FOUND_PAGE } from '../../common';
import { Router } from '../../framework';
import { _404Controller } from './_404.controller';

export const _404Router: Router = [
  {
    path: NOT_FOUND_PAGE,
    method: 'get',
    className: _404Controller,
    action: 'getNotFoundPage',
  },
];
