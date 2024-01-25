import {Controller, Post, Body, UploadedFile, UseInterceptors} from '@nestjs/common';
import { CreateImageDto } from "./dto/createimage.dto";
import {ImagesService} from "./images.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Image} from "../images/images.model";

@ApiTags("Изображения")
@Controller('images')
export class ImagesController {

    constructor(private imageService: ImagesService) {}

    @ApiOperation({summary: "Добавление нового изображения в базу"})
    @ApiResponse({status: 200, type: Image})
    @Post()
    @UseInterceptors(FileInterceptor("image"))

    uploadImage(@Body() dto: CreateImageDto,
                @UploadedFile() image){
        return this.imageService.upload(dto, image)
    }
}
