import { GetOneProductDto } from "src/product/dto/get-one-product.dto";
import { ResponseSetCurrencyDto } from "src/product/dto/response-set-currency.dto";
import { Product } from "src/product/entities/product.entity";

export const product: Product = {
  "description" : "tenis nike",
  "price" : 529.99,
}

export const productWithNegativePrice = {
  ...product,
  price: -500
}

export const setCurrency: ResponseSetCurrencyDto = {
  "BRL": 500,
  "EUR": 97.47,
  "INR": 7755,
  "USD": 97.09,
}

export const productId: GetOneProductDto = {
  id: '63291e9e8dadda84e1023b2e'
}