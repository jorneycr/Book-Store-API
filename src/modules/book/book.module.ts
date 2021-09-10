import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../user/user.repository';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookRepository, UserRepository]),
    AuthModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
