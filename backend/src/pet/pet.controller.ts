import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PetListResponseDto } from './dto/pet-list-response.dto';
import { PetResponseDto } from './dto/pet-response.dto';
import { PetParamDto } from './dto/pet-param.dto';
import { GenericMessageDto } from '../core/dto/generic-message.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @ApiBody({ type: CreatePetDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: PetResponseDto })
  @ApiOperation({
    summary: 'This endpoint is used to save the pet information',
  })
  async create(@Body() createPetDto: CreatePetDto): Promise<PetResponseDto> {
    return this.petService.create(createPetDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: PetListResponseDto })
  @ApiOperation({
    summary: 'This endpoint is used to get all the pets',
  })
  async findAll(
    @Query() queryParams: PetParamDto,
  ): Promise<PetListResponseDto> {
    return this.petService.findAll(queryParams);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: PetResponseDto })
  @ApiOperation({
    summary: 'This endpoint is used to get the pet',
  })
  async findOne(@Param('id') id: string): Promise<PetResponseDto> {
    return this.petService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GenericMessageDto })
  @ApiOperation({
    summary: 'This endpoint is used to update a  pet',
  })
  async update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<GenericMessageDto> {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: GenericMessageDto })
  @ApiOperation({
    summary: 'This endpoint is used to delete a pet',
  })
  async remove(@Param('id') id: string): Promise<GenericMessageDto> {
    return this.petService.remove(id);
  }
}
