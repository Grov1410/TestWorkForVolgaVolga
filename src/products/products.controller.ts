import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    Delete,
    Patch,
    Param,
    HttpStatus,
    HttpException
} from '@nestjs/common';
import {ProductsService} from "./products.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto"
import {Product} from "./products.model";
import {ValidationPipe} from "../pipes/validation.pipe";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";

@ApiTags("Продукты")
@Controller("products")
export class ProductsController {
    constructor(private productService: ProductsService) {}

    @ApiOperation({summary: "Получение всех продуктов в базе"})
    @ApiResponse({status: 200, type: [Product]})
    @Get()
    getAll(){
        return this.productService.findAll();
    };

    @ApiOperation({summary: "Получение продукта из базы по Id_product"})
    @ApiResponse({status: 200, type: Product})
    @Get(":id")
    findOne(@Param("id") id: FindOneOptions<Product>): Promise< Product | null>{
        return this.productService.findOne(id);
    };

    @ApiOperation({summary: "Добавление нового продукта в базу"})
    @ApiResponse({status: 200, type: Product})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() productDto: CreateProductDto){
        return this.productService.createProduct(productDto);
    };

    @ApiOperation({summary: "Изменение данных продукта"})
    @ApiResponse({status: 200, type: Product})
    @Patch(":id")
    async patchProduct(@Param("id") id: number, @Body() updateProductDto: UpdateProductDto){
        try {
            return await this.productService.patchProduct(id, updateProductDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @ApiOperation({summary: "Удаление продукта"})
    @ApiResponse({status: 200, type: Product})
    @Delete(":id")
    async remove(@Param("id") id: number){
        try {
            return await this.productService.deleteProduct(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
