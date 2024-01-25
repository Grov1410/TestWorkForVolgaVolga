import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";


export class CreateImageDto {
    @ApiProperty({example: "Dust", description: "Наименование изображения"})
    @IsString({message: "Должно быть строкой"})
    readonly image: string;
}

