import multer from 'multer';

export class DiskStorageService {
  constructor(private filePath: string) {}

  public createFileUploader() {
    return multer({ storage: this.createStorage() });
  }

  private createStorage() {
    return multer.diskStorage({
      destination: (_, __, cb) => cb(null, this.filePath),
      filename: (_, { originalname }, cb) => {
        return cb(null, this.getFileName(originalname));
      },
    });
  }

  private getFileName(fileName: string) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `${uniqueSuffix}-${fileName}`;
  }
}
