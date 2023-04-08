import express from 'express';
import multer from 'multer';

import { LotController } from '../controllers/lotController';

export const lotRouter = express.Router();
const lotController = new LotController();
const upload = multer({ dest: 'uploads/' });

lotRouter.get('/add', lotController.addGet);
lotRouter.post('/add', upload.single('lot'), lotController.addPost);
lotRouter.get('/:id', lotController.getById);
