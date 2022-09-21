import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CurrencyEUR } from 'src/core/helpers/currency-converter/Currency-eur';
import { CurrencyINR } from 'src/core/helpers/currency-converter/Currency-inr';
import { CurrencyUSD } from 'src/core/helpers/currency-converter/Currency-usd';
import { product, productId, productWithNegativePrice, setCurrency } from 'src/core/helpers/test/mocks/product.mock';
import { MockType, repositoryMockFactory } from '../core/helpers/test/mocks/repository-factory.mock';
import { Product, ProductDocument } from './entities/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: MockType<Model<ProductDocument>>;
  process.env.EUR = '5.13';
  process.env.USD ='5.15';
  process.env.INR ='15.51';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useFactory: repositoryMockFactory,
        },
        CurrencyUSD,
        CurrencyEUR,
        CurrencyINR
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get(getModelToken(Product.name));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('findOne', () => {
    it('should bring a product with the given id', async () => {
      productRepository.findOne.mockReturnValueOnce(product)
      const response = await service.findOne('63291e9e8dadda84e1023b2e');
      expect(response).toMatchObject(product);
    });

    it('should return null if the given id is invalid', async () => {
      productRepository.findOne.mockReturnValueOnce(null)
      const response = await service.findOne('63291e9e8dadda84e1023b2e');
      expect(response).toBeNull();
    });
  })

  describe('setCurrency', () => {
    it('should return an exception if a negative or null value is given', () => {
      const spySetCurrency = jest.spyOn<any, any>(service, 'findOne').mockResolvedValueOnce(productWithNegativePrice);
      expect(() => {
        service['setCurrency'](productWithNegativePrice.price);
      }).toThrow();
    });

    it('should return the price converted to blr usd eur inr', () => {
      const spySetCurrency = jest.spyOn<any, any>(service, 'findOne').mockResolvedValueOnce(product);
      const response = service['setCurrency'](500);

      expect(response).toMatchObject(setCurrency);
    });
  });

  describe('getCurrency', () => {
    it('should return an exception if the return of findOne is null', async () => {
      const spyFindOne = jest.spyOn<any, any>(service, 'findOne').mockResolvedValueOnce(null);

      await expect(service['getCurrency'](productId)).rejects.toThrow('The product with the given id was not found');
      expect(spyFindOne).toHaveBeenCalledTimes(1);
    });

    it('should return the converted price', async () => {
      const spyFindOne = jest.spyOn<any, any>(service, 'findOne').mockResolvedValueOnce(product);
      const spySetCurrency = jest.spyOn<any, any>(service, 'setCurrency').mockResolvedValueOnce(setCurrency);
      const response = await service.getCurrency(productId);

      expect(response).toMatchObject(setCurrency);
      expect(spyFindOne).toHaveBeenCalledTimes(1);
      expect(spySetCurrency).toHaveBeenCalledTimes(1);
    });
  })
});
