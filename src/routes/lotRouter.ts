import express from 'express';

import {
  CATEGORY_PARAMETER_NAME,
  ID_PARAMETER,
  NAME_PARAMETER,
  NEW_PARAMETER_NAME,
} from '../common';
import { LotController } from '../controllers';
import { DiskStorageService } from '../services';

export const lotRouter = express.Router();
const lotController = new LotController();
const diskStorage = new DiskStorageService('public/img/uploads');
const fileUploader = diskStorage.createFileUploader();

lotRouter.get(NEW_PARAMETER_NAME, lotController.newLotPage);
lotRouter.post(
  NEW_PARAMETER_NAME,
  fileUploader.single('lot-image'),
  lotController.addNewLot,
);
lotRouter.get(ID_PARAMETER, lotController.lotByIdPage);
lotRouter.get(
  `${CATEGORY_PARAMETER_NAME}${NAME_PARAMETER}`,
  lotController.lotsByCategoryPage,
);
