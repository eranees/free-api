import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
})
export class DatabaseModule {
  onModuleInit() {
    new Logger(DatabaseModule.name).log(
      'Establishing connection to the database at http://localhost:5432',
    );
  }
}
