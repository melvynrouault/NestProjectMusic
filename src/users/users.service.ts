import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return found;
  }

  async getUserByMail(mail: string): Promise<User> {
    const found = await this.userRepository.findOne({ mail });
    if (!found) {
      throw new NotFoundException(`User with mail ${mail} not found`);
    }

    return found;
  }

  async getProfile(id: number): Promise<User> {
    const found = await this.userRepository
      .createQueryBuilder()
      .select(['user.id', 'user.mail'])
      .from(User, 'user')
      .where('user.id = :id', { id })
      .getOne();
    if (!found) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return found;
  }
  async createUser(createUserDto: CreateUserDto) {
    const insert = await this.userRepository.createUser(createUserDto);
    if (!insert) {
      throw new Error('User not inserted');
    }

    return insert;
  }

  async signin(createUserDto: CreateUserDto) {
    const user = await this.getUserByMail(createUserDto.mail);
    console.log(`User : ${JSON.stringify(user)} `);
    const isValid = await bcrypt.compare(createUserDto.password, user.password);
    console.log(`Same: ${isValid}`);
    if (isValid) {
      return user;
    } else {
      throw new Error('Invalid credentials');
    }
    // compare password
    // if ok => return user
    // if not => return error
  }

  async deleteUserById(id: number): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}
