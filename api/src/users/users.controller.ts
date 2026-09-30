import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { type NewUser, User } from 'src/schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | undefined> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() user: NewUser): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
