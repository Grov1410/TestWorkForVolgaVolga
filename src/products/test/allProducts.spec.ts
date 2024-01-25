import { Test, TestingModule } from '@nestjs/testing';
import {ProductsService} from "../products.service";
import {Product} from "../products.model";
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductService', () => {
    let service: ProductsService;
    const mockProductRepository = {
        find: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockProductRepository,
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a list of products', async () => {
        const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' },{ id: 3, name: 'Product 3' }];
        mockProductRepository.find.mockReturnValue(mockProducts);

        const result:Product[] = await service.findAll(2, 2);

        expect(result).toEqual(mockProducts);
    });

    it('should throw an error if products not found', async () => {
        mockProductRepository.find.mockReturnValue([]);

        try {
            await service.findAll(1, 5);
        } catch (e) {
            expect(e.message).toBe('Products not found');
        }
    });
});
