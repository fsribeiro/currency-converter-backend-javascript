export abstract class CurrencyConverterBase {
  protected abstract converter(price: number): number;
}