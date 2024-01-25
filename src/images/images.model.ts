import {Entity, Column, PrimaryGeneratedColumn,OneToOne} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Product} from "../products/products.model";

interface productImgCreation {
    image: string;
}

@Entity()
export class Image {
    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: "/static/images/socks.jpeg", description: "Путь к изображению продукции"})
    @Column({
        type: 'varchar'
    })
    image: string

    @OneToOne(() => Product, product => product.image)
    product: Product;
}

