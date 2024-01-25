import {Module} from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import {ConfigModule} from "@nestjs/config";
import {Product} from "./products/products.model";
import { ImagesModule } from './images/images.module';
import { Image } from "./images/images.model";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
           envFilePath: ".env"
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'multipart/form-data'),
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST || "127.0.0.2",
            port: Number(process.env.POSTGRES_PORT) || 5432,
            username: process.env.POSTGRES_USER || "postgres",
            password: process.env.POSTGRES_PASSWORD || "8776",
            database: process.env.POSTGRES_DB || "volga_volga",
            entities: [Product, Image],
            //entities:[__dirname + "/**/*.model{.js, .ts}"], - при большом количестве сущностей
            synchronize: true
        }),
        TypeOrmModule.forFeature([Product, Image]),
        ProductsModule,
        ImagesModule,
    ],
})
export class AppModule {}
