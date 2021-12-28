import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '@config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.write_host,
      port: 5432,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      replication: {
        master: {
          host: config.database.write_host,
          port: 5432,
          username: config.database.username,
          password: config.database.password,
          database: config.database.database,
        },
        slaves: [
          {
            host: config.database.read_host,
            port: 5432,
            username: config.database.username,
            password: config.database.password,
            database: config.database.database,
          },
        ],
      },
      entities: ['dist/**/*.entity.{ts,js}'],
      // migrations: ['./src/migrations/*.ts'],
      synchronize: config.DEBUG,
    }),
  ],
})
export class AppModule {
}
