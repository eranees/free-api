import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PetGender } from '../../core/globals.constants';

export class PetResponseDto {
  @ApiProperty({
    description: 'Unique ID of the Pet',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  readonly id: string;

  @ApiProperty({
    description: 'Pet Name',
    example: 'Max',
  })
  @Expose()
  readonly name: string;

  @ApiProperty({
    description: 'Pet Date of Birth',
    type: String,
    format: 'date',
    default: new Date().toISOString(),
  })
  @Expose()
  readonly dob: Date;

  @ApiProperty({
    description: 'Pet Gender',
    enum: PetGender,
    example: PetGender.Male,
  })
  @Expose()
  readonly gender: PetGender;

  @ApiProperty({
    description: 'Pet Breed',
    example: 'Beagle',
    required: false,
  })
  @Expose()
  readonly breed?: string;

  @ApiProperty({
    description: 'Pet Owner Name',
    example: 'Anees',
  })
  @Expose()
  readonly ownerName: string;

  @ApiProperty({
    description: 'Pet Owner Email',
    example: 'aneesakbar33@gmail.com',
  })
  @Expose()
  readonly ownerEmail: string;

  @ApiProperty({
    description: 'Timestamp of when the pet record was created',
    default: new Date().toISOString(),
  })
  @Expose()
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Timestamp of the last update to the pet record',
    default: new Date().toISOString(),
  })
  @Expose()
  readonly updatedAt: Date;

  @ApiProperty({
    description: 'Timestamp of when the pet record was deleted, if applicable',
    example: null,
    required: false,
  })
  @Expose()
  readonly deletedAt?: Date;
}
