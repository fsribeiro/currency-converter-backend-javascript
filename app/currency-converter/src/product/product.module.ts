import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { CurrencyUSD } from '../core/helpers/currency-converter/Currency-usd';
import { CurrencyEUR } from 'src/core/helpers/currency-converter/Currency-eur';
import { CurrencyINR } from 'src/core/helpers/currency-converter/Currency-inr';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Product.name, schema: ProductSchema }],
    ),
  ],
  controllers: [ProductController],
  providers: [ProductService, CurrencyUSD, CurrencyEUR, CurrencyINR]
})
export class ProductModule {
}
