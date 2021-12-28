import 'fastify';
import { UserEntity } from '@entities/user.entity';

declare module 'fastify' {
  export interface FastifyRequest {
    user: UserEntity;
  }
}
