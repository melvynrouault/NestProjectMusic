import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

const salt = 10;

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { mail, password } = createUserDto;

    const user = new User();
    user.mail = mail;
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return user;
  }
}
