import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Product} from "./products.model";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateProductDto} from "./dto/create-product.dto";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private productRepository: Repository <Product>) {}
    async findAll(page: number = 1, limit: number = 2):Promise< Product[] > {
        try {
            const skippedItems: number = (page-1) * limit;
            const allProducts:Product[] = await this.productRepository.find({
                    skip: skippedItems,
                    take: limit,
                }
            );
            return allProducts;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
    async findOne(id: FindOneOptions<Product>): Promise< Product | null> {
        const product: Product = await this.productRepository.findOne(id);
        if (!product) {
            throw new NotFoundException("Продукт не найден");
        }
        const totalCost: number = this.calculateTotalCost(product.units_in_stock, product.unit_price);
        return { ...product};
   };
    private calculateTotalCost(unitsInStock: number, unitPrice: number): number {
        return unitsInStock * unitPrice;
    }
    async createProduct(dto: CreateProductDto){
        return this.productRepository.create(dto);
    };
    async patchProduct(id: number, dto: Partial<Product>):Promise<Product>{
        try {
            const product = await this.productRepository.findOneBy({ id });
            if (!product) {
                throw new Error('Продукт не найден');
            }
            Object.assign(product, dto);
            await this.productRepository.save(product);
            return product;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
    async deleteProduct(id: number):Promise<void> {
        try {
            const product = await this.productRepository.findOneBy({id});
            if (!product) {
                throw new Error('Продукт не найден');
            }
            await this.productRepository.delete(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
