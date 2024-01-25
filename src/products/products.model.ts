import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import { Image } from '../images/images.model';

interface productCreationAttrs {
    product_name: string;
    unit_price: number;
    units_in_stock: number;
}

@Entity()
export class Product {
    @ApiProperty({example: "1", description: "Уникальный идентификатор"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: "Носки", description: "Номенклатурная единица продукции"})
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    product_name: string;

    @ApiProperty({example: "1,75", description: "Цена за единицу продукции"})
    @Column({type: 'decimal', precision: 10, scale: 2})
    unit_price: number;

    @ApiProperty({example: "42", description: "Остаток единиц продукции на складе"})
    @Column({ type: 'integer', default: 0})
    units_in_stock: number;

    @OneToOne(() => Image,image=>image.product, { cascade: true } )
    @JoinColumn()
    image: Image;
}
