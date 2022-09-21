import { CurrencyConverterBase } from "./Currency-converter-base";

export class CurrencyUSD extends CurrencyConverterBase{
  private usd = +process.env.USD;
  constructor() {
    super()
  }

  converter(price: number): number{
    const convertedCurrency =  price / this.usd;
    return +convertedCurrency.toFixed(2);
  }
}