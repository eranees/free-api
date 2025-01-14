import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min, IsEnum, IsString } from 'class-validator';
import { OrderDirection, PetOrderBy } from '../../core/globals.constants';

export class PetParamDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  @ApiProperty({ minimum: 0, example: 0, required: false })
  offset: number = 0;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1, example: 10, required: false })
  limit: number = 10;

  @IsEnum(PetOrderBy)
  @ApiProperty({
    enum: PetOrderBy,
    default: PetOrderBy.CreatedAt,
    required: false,
  })
  petOrderBy: PetOrderBy = PetOrderBy.CreatedAt;

  @IsEnum(OrderDirection)
  @IsOptional()
  @ApiProperty({
    enum: OrderDirection,
    default: OrderDirection.Desc,
    required: false,
  })
  orderDirection?: OrderDirection = OrderDirection.Desc;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Search term for filtering pets',
    required: false,
  })
  query?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Filter by email',
    required: false,
  })
  email?: string;
}
