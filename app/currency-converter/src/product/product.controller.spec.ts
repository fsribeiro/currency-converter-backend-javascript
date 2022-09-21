import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyEUR } from 'src/core/helpers/currency-converter/Currency-eur';
import { CurrencyINR } from 'src/core/helpers/currency-converter/Currency-inr';
import { CurrencyUSD } from 'src/core/helpers/currency-converter/Currency-usd';
import { productId } from 'src/core/helpers/test/mocks/product.mock';
import { repositoryMockFactory } from 'src/core/helpers/test/mocks/repository-factory.mock';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
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

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);

  });

  describe('GET- products/:id', () => {
    it('should call the x method of the service', async () => {
      const spyGetCurrency = jest.spyOn(service, 'getCurrency').mockImplementationOnce(() => null)
      await controller.getCurrency(productId);
      expect(spyGetCurrency).toHaveBeenCalledTimes(1);
    });
  });
});
