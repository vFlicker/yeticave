import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

import { getDirname } from '../utils/get-dirname.js';

const FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];
const UPLOAD_DIR = '../upload/img';

const __dirname = getDirname(import.meta.url);
const absoluteUploadDirPath = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: absoluteUploadDirPath,
  filename: (_req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split('.').pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const isAllowed = FILE_TYPES.includes(file.mimetype);
  cb(null, isAllowed);
};

export const upload = multer({ storage, fileFilter });
