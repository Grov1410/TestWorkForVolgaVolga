import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsInt, Min } from 'class-validator';

// eslint-disable-next-line import/prefer-default-export
export class CreateProductDto {
  @ApiProperty({
    example: 'Носки',
    description: 'Номенклатурная единица продукции',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly productName: string;

  @ApiProperty({ example: '1,75', description: 'Цена за единицу продукции' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Должно быть числом с точностью до 2х знаков после запятой' },
  )
  @Min(0, { message: 'Цена не может быть отрицательной' })
  // @IsNumber({}, { message: 'Цена должна быть числом' })
  // @IsDecimal({ decimal_digits: '1,2'}, {message: 'Цена должна быть числом с двумя знаками после запятой' })
  readonly unitPrice: number;

  @ApiProperty({
    example: '42',
    description: 'Остаток единиц продукции на складе',
  })
  @IsInt({ message: 'Остаток должен быть целым числом' })
  @Min(0, { message: 'Остаток не может быть отрицательным числом' })
  readonly unitsInStock: number;
}
