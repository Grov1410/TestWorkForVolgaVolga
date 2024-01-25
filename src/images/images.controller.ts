import {Controller, Post, Body, UploadedFile, UseInterceptors} from '@nestjs/common';
import { CreateImageDto } from "./dto/createimage.dto";
import {ImagesService} from "./images.service";
import {FileInterceptor} from "@nestjs/platform-express";
@Controller('images')
export class ImagesController {

    constructor(private imageService: ImagesService) {}

    @Post()
    @UseInterceptors(FileInterceptor("image"))
    uploadImage(@Body() dto: CreateImageDto,
                @UploadedFile() image){
        return this.imageService.upload(dto, image)
    }
}
