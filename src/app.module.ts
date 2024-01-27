import * as path from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductsModule } from './products/products.module';
import { Product } from './products/products.model';
import { ImagesModule } from './images/images.module';
import { Image } from './images/images.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'multipart/form-data'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || '127.0.0.2',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || '8776',
      database: process.env.POSTGRES_DB || 'volga_volga',
      entities: [Product, Image], // entities:[__dirname + "/**/*.model{.js, .ts}"], - при большом количестве сущностей
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Image]),
    ProductsModule,
    ImagesModule,
  ],
})
// eslint-disable-next-line import/prefer-default-export
export class AppModule {}
