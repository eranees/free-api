import { Injectable } from '@nestjs/common';
import { PetEntity } from '../entities/pet.entity';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { PetResponseDto } from '../dto/pet-response.dto';

@Injectable()
export class PetMapper {
  toPersistence(PetDto: any): PetEntity {
    return plainToClass(PetEntity, instanceToPlain(PetDto));
  }

  toResponse(data: any): PetResponseDto {
    return plainToClass(PetResponseDto, instanceToPlain(data));
  }

  toArrayResponse(data: any): PetResponseDto[] {
    return data.map((item: any) => {
      return this.toPersistence(item);
    });
  }
}
