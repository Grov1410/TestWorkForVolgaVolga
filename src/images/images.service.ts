import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import type { FilesService } from '../files/file.service';

import type { CreateImageDto } from './dto/createImage.dto';
import { Image } from './images.model';

@Injectable()
// eslint-disable-next-line import/prefer-default-export
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    private fileService: FilesService,
  ) {}

  async upload(dto: CreateImageDto, image: unknown) {
    const fileName = await this.fileService.createFile(image);
    return this.imageRepository.create({ ...dto, image: fileName });
  }
}
