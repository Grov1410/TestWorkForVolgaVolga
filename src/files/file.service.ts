import * as path from 'path';
import * as fs from 'fs';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

@Injectable()
// eslint-disable-next-line import/prefer-default-export
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName = `${uuid.v4()}.jpg`;
      const filePath = path.resolve(__dirname, '..', 'multipart/form-data');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
