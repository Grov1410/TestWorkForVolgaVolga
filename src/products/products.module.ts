import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./products.model";
import {Image} from "../images/images.model";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, Image])
  ]
})
export class ProductsModule {}
