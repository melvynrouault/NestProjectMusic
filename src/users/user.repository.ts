import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

const salt = 10;

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { mail, password, albums } = createUserDto;

    const user = new User();
    user.mail = mail;
    user.password = await bcrypt.hash(password, salt);
    user.albums = albums;

    await user.save();
    return user;
  }

  async signin(createUserDto: CreateUserDto): Promise<User> {
    const { mail } = createUserDto;

    const user = new User();
    const userFound = this.find({ mail });
    console.log(`user : ${JSON.stringify(user)}`);
    console.log(`userfound : ${JSON.stringify(userFound)}`);
    return user;
  }
}
