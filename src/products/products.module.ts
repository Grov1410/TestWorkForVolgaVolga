import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Image } from '../images/images.model';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, Image])],
})
// eslint-disable-next-line import/prefer-default-export
export class ProductsModule {}
