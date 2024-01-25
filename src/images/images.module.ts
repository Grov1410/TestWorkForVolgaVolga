import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "../products/products.model";
import {Image} from "./images.model";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [
    TypeOrmModule.forFeature([Product, Image]),
      FilesModule
  ]
})
export class ImagesModule {}
