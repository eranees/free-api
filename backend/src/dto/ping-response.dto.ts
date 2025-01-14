import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class PingResponseDto {
  @Expose()
  @IsString()
  @ApiProperty({ type: String, example: 'Version', description: 'App version' })
  readonly appVersion;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, example: 'Name', description: 'App Name' })
  readonly appName;
}
