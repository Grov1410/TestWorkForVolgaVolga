import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line import/no-cycle
import { Image } from '../images/images.model';

// eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars
interface productCreationAttrs {
  productName: string;
  unitPrice: number;
  unitsInStock: number;
}

@Entity()
// eslint-disable-next-line import/prefer-default-export
export class Product {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Носки',
    description: 'Номенклатурная единица продукции',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  productName: string;

  @ApiProperty({ example: '1,75', description: 'Цена за единицу продукции' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @ApiProperty({
    example: '42',
    description: 'Остаток единиц продукции на складе',
  })
  @Column({ type: 'integer', default: 0 })
  unitsInStock: number;

  @OneToOne(() => Image, (image) => image.product, { cascade: true })
  @JoinColumn()
  image: Image; // null;
}
