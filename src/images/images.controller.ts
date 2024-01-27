import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import type { CreateImageDto } from './dto/createimage.dto';
import type { ImagesService } from './images.service';
import { Image } from './images.model';

@ApiTags('Изображения')
@Controller('images')
// eslint-disable-next-line import/prefer-default-export
export class ImagesController {
  // eslint-disable-next-line no-empty-function
  constructor(private imageService: ImagesService) {}

  @ApiOperation({ summary: 'Добавление нового изображения в базу' })
  @ApiResponse({ status: 200, type: Image })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@Body() dto: CreateImageDto, @UploadedFile() image) {
    return this.imageService.upload(dto, image);
  }
}
