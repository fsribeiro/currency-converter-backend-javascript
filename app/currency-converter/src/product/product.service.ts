import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CurrencyEUR } from 'src/core/helpers/currency-converter/Currency-eur';
import { CurrencyINR } from 'src/core/helpers/currency-converter/Currency-inr';
import { CurrencyUSD } from 'src/core/helpers/currency-converter/Currency-usd';
import { GetOneProductDto } from './dto/get-one-product.dto';
import { ResponseSetCurrencyDto } from './dto/response-set-currency.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private currencyUsd: CurrencyUSD,
    private currencyEur: CurrencyEUR,
    private currencyInr: CurrencyINR
  ) {
  }

  async findOne(id: string): Promise<ProductDocument | null> {
    return this.productModel.findOne({ _id: new Types.ObjectId(id) });
  }

  private setCurrency(price: number): ResponseSetCurrencyDto {
    if (Math.sign(price) !== 1) {
      throw new BadRequestException('Price cannot be negative');
    }

    const usd = this.currencyUsd.converter(price);
    const eur = this.currencyEur.converter(price);
    const inr = this.currencyInr.converter(price);

    return {
      BRL: +price.toFixed(2),
      USD: usd,
      EUR: eur,
      INR: inr,
    };
  }

  async getCurrency(params: GetOneProductDto): Promise<ResponseSetCurrencyDto> {
    try {
      const product = await this.findOne(params.id);

      if (!product) {
        throw new NotFoundException('The product with the given id was not found');
      };

      return this.setCurrency(product.price);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
