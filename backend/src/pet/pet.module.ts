import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PetEntity } from './entities/pet.entity';
import { PetMapper } from './mapper/pet.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  controllers: [PetController],
  providers: [PetService, PetMapper],
})
export class PetModule {}
