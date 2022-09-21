import { CurrencyConverterBase } from "./Currency-converter-base";

export class CurrencyEUR extends CurrencyConverterBase{
  private eur = +process.env.EUR;
  constructor() {
    super()
  }

  converter(price: number): number {
    const convertedCurrency =  price / this.eur;
    return +convertedCurrency.toFixed(2);
  }
}