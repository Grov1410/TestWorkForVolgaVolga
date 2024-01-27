import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// eslint-disable-next-line import/prefer-default-export
export class CreateImageDto {
  @ApiProperty({ example: 'Dust', description: 'Наименование изображения' })
  @IsString({ message: 'Должно быть строкой' })
  readonly image: string;
}
