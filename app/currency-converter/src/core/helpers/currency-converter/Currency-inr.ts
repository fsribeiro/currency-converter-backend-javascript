import { CurrencyConverterBase } from "./Currency-converter-base";

export class CurrencyINR extends CurrencyConverterBase{
  private inr = +process.env.INR;;
  constructor() {
    super()
  }

  converter(price: number): number{
    const convertedCurrency = price * this.inr;
    return +convertedCurrency.toFixed(3);
  }
}