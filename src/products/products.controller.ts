import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import { ValidationPipe } from '../pipes/validation.pipe';

import type { ProductsService } from './products.service';
import type { CreateProductDto } from './dto/create-product.dto';
import type { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.model';

@ApiTags('Продукты')
@Controller('products')
// eslint-disable-next-line import/prefer-default-export
export class ProductsController {
  // eslint-disable-next-line no-empty-function
  constructor(private productService: ProductsService) {}

  @ApiOperation({ summary: 'Получение всех продуктов в базе' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Получение продукта из базы по Id_product' })
  @ApiResponse({ status: 200, type: Product })
  @Get(':id')
  findOne(@Param('id') id: FindOneOptions<Product>): Promise<Product | null> {
    return this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Добавление нового продукта в базу' })
  @ApiResponse({ status: 200, type: Product })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() productDto: CreateProductDto) {
    return this.productService.createProduct(productDto);
  }

  @ApiOperation({ summary: 'Изменение данных продукта' })
  @ApiResponse({ status: 200, type: Product })
  @Patch(':id')
  async patchProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.patchProduct(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Удаление продукта' })
  @ApiResponse({ status: 200, type: Product })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }
}
