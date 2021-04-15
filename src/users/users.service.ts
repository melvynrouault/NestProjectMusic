import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

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
  async createUser(createUserDto: CreateUserDto) {
    const insert = await this.userRepository.createUser(createUserDto);
    if (!insert) {
      throw new Error('User not inserted');
    }

    return insert;
  }

  async deleteUserById(id: number): Promise<void> {
    const deleted = await this.userRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}
