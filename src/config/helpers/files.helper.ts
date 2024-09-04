import { v4 as uuid } from 'uuid';

export class FilesHelper {
  public static fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (arg: Error | null, arg2: boolean) => void,
  ) => {
    if (!file) return callback(new Error('File is empty'), false);

    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    if (!validExtensions.includes(fileExtension)) {
      return callback(new Error('Invalid file extension'), false);
    }

    callback(null, true);
  };

  public static fileNamer = (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (arg: Error | null, arg2: string) => void,
  ) => {
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = `${uuid()}.${fileExtension}`;

    callback(null, fileName);
  };
}
