import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../products/products.model';
import { FilesModule } from '../files/files.module';

import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './images.model';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [TypeOrmModule.forFeature([Product, Image]), FilesModule],
})
// eslint-disable-next-line import/prefer-default-export
export class ImagesModule {}
