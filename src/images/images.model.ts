import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line import/no-cycle
import { Product } from '../products/products.model';

// eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars
interface productImgCreation {
  image: string;
}

@Entity()
// eslint-disable-next-line import/prefer-default-export
export class Image {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '/static/images/socks.jpeg',
    description: 'Путь к изображению продукции',
  })
  @Column({
    type: 'varchar',
  })
  image: string;

  @OneToOne(() => Product, (product) => product.image)
  product: Product;
}
