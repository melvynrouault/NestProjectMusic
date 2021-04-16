import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser } from './get-user.decorator';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Get('/getProfile')
  @UseGuards(AuthGuard())
  async getProfile(@AuthUser() user: User): Promise<User> {
    return this.userService.getProfile(user.id);
  }

  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post('/createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/signin')
  async signin(@Body() createUserDto: CreateUserDto) {
    // call service to connect
    const user = await this.userService.signin(createUserDto);
    const payload: JwtPayload = {
      id: user.id,
      mail: createUserDto.mail,
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  @Delete('/:id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUserById(id);
  }
}
