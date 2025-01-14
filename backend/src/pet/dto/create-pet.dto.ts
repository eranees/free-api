import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PetGender } from '../../core/globals.constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Pet Name',
    example: 'Max',
    type: String,
    required: true,
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Pet DOB',
    type: String,
    format: 'date',
    default: new Date().toISOString(),
    required: true,
  })
  readonly dob: Date;

  @IsEnum(PetGender)
  @ApiProperty({
    description: 'Pet Gender',
    enum: PetGender,
    example: PetGender.Male,
    required: true,
  })
  readonly gender: PetGender;

  @IsString()
  @ApiProperty({
    description: 'Pet Breed',
    type: String,
    example: 'Beagle',
    required: false,
  })
  readonly breed: string;

  @IsString()
  @ApiProperty({
    description: 'Pet Owner Name',
    type: String,
    example: 'Anees',
    required: true,
  })
  readonly ownerName: string;

  @IsString()
  @ApiProperty({
    description: 'Pet Owner Email',
    type: String,
    example: 'aneesakbar33@gmail.com',
    required: true,
  })
  readonly ownerEmail: string;
}
