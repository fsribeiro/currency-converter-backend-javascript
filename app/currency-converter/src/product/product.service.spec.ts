import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { MockType, repositoryMockFactory } from '../core/helpers/test/mocks/repository-factory.mock';
import { Product, ProductDocument } from './entities/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let accountsRepository: MockType<Model<ProductDocument>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    accountsRepository = module.get(getModelToken(Product.name));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', async () => {
    await service.findOne.mockReturnValue()
    expect(service).toBeDefined();
  });
});
