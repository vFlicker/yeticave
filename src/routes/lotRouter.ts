import express from 'express';

import { LotController } from '../controllers/LotController';
import { DiskStorageService } from '../services/DiskStorageService';

export const lotRouter = express.Router();
const lotController = new LotController();
const diskStorage = new DiskStorageService('public/img/uploads');
const fileUploader = diskStorage.createFileUploader();

lotRouter.get('/add', lotController.addGet);
lotRouter.post('/add', fileUploader.single('lot-image'), lotController.addPost);
lotRouter.get('/:id', lotController.getById);
