import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { In } from 'typeorm';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { CreateBookDto, ReadBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly _bookRepository: BookRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async get(bookId: number): Promise<ReadBookDto> {
    if (!bookId) throw new BadRequestException('bookId must be sent');

    const book: Book = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!book) throw new NotFoundException('Book does not exist');

    return plainToClass(ReadBookDto, book);
  }

  async getAll(): Promise<ReadBookDto[]> {
    const books: Book[] = await this._bookRepository.find({
      where: { status: 'ACTIVE' },
    });

    return books.map((book) => plainToClass(ReadBookDto, book));
  }

  async getBookByAuthor(authorId: number): Promise<ReadBookDto[]> {
    if (!authorId) throw new BadRequestException('Id must be sent');

    const books: Book[] = await this._bookRepository
      .createQueryBuilder('books')
      .leftJoinAndSelect('books.authors', 'users')
      .where('books.status = :status', { status: 'ACTIVE' })
      .andWhere('users.id = :id ', { id: authorId })
      .getMany();

    console.log(books);
    return books.map((book) => plainToClass(ReadBookDto, book));
  }

  async create(book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    const authors: User[] = [];

    for (const authorId of book.authors) {
      const authorExists = await this._userRepository.findOne(authorId, {
        where: { status: 'ACTIVE' },
      });

      if (!authorExists)
        throw new NotFoundException(
          `There isn't an author with this id ${authorId}`,
        );

      const isAuthor = authorExists.roles.some(
        (role: Role) => role.name === RoleType.AUTHOR,
      );

      if (!isAuthor)
        throw new UnauthorizedException(`This user ${authorId} is not author`);

      authors.push(authorExists);
    }

    const saveBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      authors,
    });

    return plainToClass(ReadBookDto, saveBook);
  }

  async update(
    bookId: number,
    role: Partial<UpdateBookDto>,
    authorId: number,
  ): Promise<ReadBookDto> {
    const bookExits = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExits) throw new NotFoundException('This book does not exits');

    const isOwnBook = bookExits.authors.some(
      (author) => author.id === authorId,
    );

    if (!isOwnBook)
      throw new UnauthorizedException('This user is not the author book');

    const updateBook = await this._bookRepository.update(bookId, role);

    return plainToClass(ReadBookDto, updateBook);
  }

  async delete(bookId: number): Promise<void> {
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExists) throw new NotFoundException('This book does not exists');

    await this._bookRepository.update(bookId, { status: 'INACTIVE' });
  }
}
