import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: '',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'secret',
  database: 'free_api_db',
  synchronize: true,
  dropSchema: false,
  keepConnectionAlive: true,
  logging: true,
  autoLoadEntities: true,
  poolSize: Number(process.env.DATABASE_POOL_SIZE),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],

  cli: {
    entitiesDir: '../',
    migrationsDir: 'src/infra/database/migrations/',
    subscribersDir: 'subscriber',
  },
  extra: {
    max: 100,
    ssl: false
      ? {
          rejectUnauthorized: false,
          ca: undefined,
          key: undefined,
          cert: undefined,
        }
      : undefined,
  },
} as DataSourceOptions);
