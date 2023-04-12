import express from 'express';

import { ADD_PARAMETER_NAME, ID_PARAMETER } from '../common';
import { LotController } from '../controllers';
import { DiskStorageService } from '../services';

export const lotRouter = express.Router();
const lotController = new LotController();
const diskStorage = new DiskStorageService('public/img/uploads');
const fileUploader = diskStorage.createFileUploader();

lotRouter.get(ADD_PARAMETER_NAME, lotController.newLotPage);
lotRouter.post(
  ADD_PARAMETER_NAME,
  fileUploader.single('lot-image'),
  lotController.addNewLot,
);
lotRouter.get(ID_PARAMETER, lotController.lotPage);
