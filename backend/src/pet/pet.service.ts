import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PetEntity } from './entities/pet.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { PetResponseDto } from './dto/pet-response.dto';
import { PetMapper } from './mapper/pet.mapper';
import { PetParamDto } from './dto/pet-param.dto';
import { PetListResponseDto } from './dto/pet-list-response.dto';
import { GenericMessageDto } from '../core/dto/generic-message.dto';

@Injectable()
export class PetService {
  private readonly logger = new Logger(PetService.name);

  constructor(
    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
    private readonly petMapper: PetMapper,
  ) {}

  async create(createPetDto: CreatePetDto): Promise<PetResponseDto> {
    try {
      const existingPet = await this.petRepository.findOneBy({
        name: createPetDto.name,
        ownerEmail: createPetDto.ownerEmail,
      });

      if (existingPet) {
        throw new ConflictException(
          'A pet with these details is already registered.',
        );
      }

      const petEntity = this.petMapper.toPersistence(createPetDto);
      const savedPet = await this.petRepository.save(petEntity);

      return this.petMapper.toResponse(savedPet);
    } catch (error) {
      this.logger.error(
        `Failed to save pet information: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(queryParams: PetParamDto): Promise<PetListResponseDto> {
    const whereCondition: FindOptionsWhere<PetEntity> = {};

    if (queryParams.query) {
      whereCondition.name = ILike(`%${queryParams.query}%`);
    }

    if (queryParams.email) {
      whereCondition.ownerEmail = queryParams.email;
    }

    try {
      const [result, count] = await this.petRepository.findAndCount({
        where: whereCondition,
        skip: queryParams.offset,
        take: queryParams.limit,
        order: {
          [queryParams.petOrderBy]: queryParams.orderDirection,
        },
      });

      const pets = this.petMapper.toArrayResponse(result);

      return { pets, count };
    } catch (error) {
      this.logger.error(`Failed to get pets: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(id: string): Promise<PetResponseDto> {
    try {
      const pet = await this.petRepository.findOneBy({ id });
      if (!pet) {
        throw new NotFoundException('Pet Not Found');
      }

      return this.petMapper.toResponse(pet);
    } catch (error) {
      this.logger.error(`Failed to get a pet: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(
    id: string,
    updatePetDto: UpdatePetDto,
  ): Promise<GenericMessageDto> {
    try {
      const existingPet = await this.findOne(id);

      const petWithSameName = await this.petRepository.findOne({
        where: {
          ownerEmail: updatePetDto.ownerEmail,
          name: updatePetDto.name,
        },
      });

      if (petWithSameName && petWithSameName.id !== id) {
        throw new ConflictException('You already have a pet with this name');
      }

      const updatedPetEntity = this.petMapper.toPersistence({
        ...existingPet,
        ...updatePetDto,
      });

      await this.petRepository.save(updatedPetEntity);

      return { message: 'Pet updated successfully' };
    } catch (error) {
      this.logger.error(
        `Failed to update the pet with ID ${id}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<GenericMessageDto> {
    try {
      const pet = await this.findOne(id);

      await this.petRepository.softRemove(pet);

      return {
        message: 'Pet Deleted Successfully',
      };
    } catch (error) {
      this.logger.error(
        `Failed to delete a pet: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
