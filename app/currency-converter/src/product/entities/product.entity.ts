import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

/**
 * schema referente aos creditos dos usuários
 */
@Schema({ collection: 'products' })
export class Product {
  /**
   * objectIdLogin que faz referência _id da coleção de logins
   */
  @Prop()
  @IsString()
  description: string;

  @Prop()
  @IsNumber()
  price: number;

  /**
   *
   * @param props dados de inicialização da entidade
   */
  constructor(props?: any) {
    Object.assign(this, props);
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
