import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetOneProductDto } from './dto/get-one-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Route to get a product by id',
    description:
      'Route to get a product by id',
  })
  @ApiParam({ name: 'id', description: 'product id' })
  @Get(':id')
  async getCurrency(@Param() params: GetOneProductDto) {
    return this.productService.getCurrency(params);
  }

}
