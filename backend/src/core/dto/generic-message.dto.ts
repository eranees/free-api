import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenericMessageDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: 'Generic Message',
    description: 'Generic Message',
  })
  readonly message: string;
}
