import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet/pet.module';
import { CoreModule } from './core/core.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [PetModule, CoreModule, InfraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
