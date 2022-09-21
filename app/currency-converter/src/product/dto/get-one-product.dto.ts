import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";


export class GetOneProductDto {
  @ApiProperty({ description: 'mongo id for product' })
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}

