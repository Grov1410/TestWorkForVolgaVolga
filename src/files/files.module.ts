import { Module } from '@nestjs/common';

import { FilesService } from './file.service';

@Module({
  providers: [FilesService],
  exports: [FilesService],
})
// eslint-disable-next-line import/prefer-default-export
export class FilesModule {}
