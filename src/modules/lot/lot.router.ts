import express from 'express';

import {
  DiskStorageService,
  LOT_PAGE,
  LOTS_BY_CATEGORY_PAGE,
  NEW_LOT_PAGE,
} from '../../common';
import { LotController } from './lot.controller';

const lotRouter = express.Router();
const lotController = new LotController();
const diskStorage = new DiskStorageService('public/img/uploads');
const fileUploader = diskStorage.createFileUploader();

lotRouter.get(NEW_LOT_PAGE, lotController.getNewLotPage);
lotRouter.post(
  NEW_LOT_PAGE,
  fileUploader.single('lot-image'),
  lotController.sendNewLotPageForm,
);
lotRouter.get(LOT_PAGE, lotController.getLotPage);
lotRouter.get(LOTS_BY_CATEGORY_PAGE, lotController.getLotsByCategoryPage);

export default lotRouter;
