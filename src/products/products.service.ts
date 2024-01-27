import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import type { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

import type { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.model';

@Injectable()
// eslint-disable-next-line import/prefer-default-export
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    // eslint-disable-next-line no-empty-function
  ) {}

  async findAll(page: number = 1, limit: number = 2): Promise<Product[]> {
    const skippedItems: number = (page - 1) * limit;
    return await this.productRepository.find({
      skip: skippedItems,
      take: limit,
    });
  }

  async findOne(id: FindOneOptions<Product>): Promise<Product | null> {
    const product: Product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const totalCost: number = this.calculateTotalCost(
      product.unitsInStock,
      product.unitPrice,
    );
    return { ...product };
  }

  private calculateTotalCost(unitsInStock: number, unitPrice: number): number {
    return unitsInStock * unitPrice;
  }

  async createProduct(dto: CreateProductDto) {
    return this.productRepository.create(dto);
  }

  async patchProduct(id: number, dto: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error('Продукт не найден');
    }
    Object.assign(product, dto);
    await this.productRepository.save(product);
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error('Продукт не найден');
    }
    await this.productRepository.delete(id);
  }
}
