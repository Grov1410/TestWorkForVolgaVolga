import { Injectable } from '@nestjs/common';
import {CreateImageDto} from "./dto/createImage.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Image} from "./images.model";
import {FilesService} from "../files/file.service";

@Injectable()
export class ImagesService {

    constructor(@InjectRepository(Image) private imageRepository: Repository<Image>,
                private fileService: FilesService){}
    async upload(dto: CreateImageDto, image: any){
        const fileName = await this.fileService.createFile(image);
        return this.imageRepository.create({...dto, image: fileName});
    }
}
