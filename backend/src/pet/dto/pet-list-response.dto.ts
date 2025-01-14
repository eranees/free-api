import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

import { PetResponseDto } from './pet-response.dto';

export class PetListResponseDto {
  @IsArray()
  @ApiProperty({ type: [PetResponseDto], description: 'List Of Pets' })
  pets: PetResponseDto[];

  @IsNumber()
  @ApiProperty({ type: Number, description: 'Total Pets' })
  count: number;
}
