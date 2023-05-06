import {
  DiskStorageService,
  LOT_PAGE,
  LOTS_BY_CATEGORY_PAGE,
  NEW_LOT_PAGE,
} from '../../common';
import { Router } from '../../framework';
import { LotController } from './lot.controller';

const diskStorage = new DiskStorageService('public/img/uploads');
const fileUploader = diskStorage.createFileUploader();

export const lotRouter: Router = [
  {
    path: NEW_LOT_PAGE,
    method: 'get',
    className: LotController,
    action: 'getNewLotPage',
  },
  {
    path: NEW_LOT_PAGE,
    method: 'post',
    className: LotController,
    action: 'sendNewLotForm',
    middlewares: [fileUploader.single('lot-image')],
  },
  {
    path: LOT_PAGE,
    method: 'get',
    className: LotController,
    action: 'getLotPage',
  },
  {
    path: LOT_PAGE,
    method: 'post',
    className: LotController,
    action: 'sendNewBetForm',
  },
  {
    path: LOTS_BY_CATEGORY_PAGE,
    method: 'get',
    className: LotController,
    action: 'getLotsByCategoryPage',
  },
];
