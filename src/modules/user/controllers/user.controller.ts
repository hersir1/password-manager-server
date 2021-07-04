import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserDataSourceService } from '../services/user-data-source.service';
import { UserDto } from '../models/user-dto';
import { UserDtoFront } from '../models/user-dto-front';

@Controller('user')
export class UserController {

  constructor(private userServiceDataSource: UserDataSourceService) {
  }

  @Get('/login')
  @HttpCode(HttpStatus.OK)
  getUserByLogin(
    @Query('loginOrEmail') loginOrEmail: string,
    @Query('password') password: string
  ): Promise<UserDtoFront | null> {
    return this.userServiceDataSource.getUserByLogin(loginOrEmail, password);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userServiceDataSource.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  addUser(@Body() userDto: UserDto): Promise<UserDtoFront | null> {
    return this.userServiceDataSource.addUser(userDto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  updateUser(@Body() userDto: UserDto): Promise<UserDtoFront | null> {
    return this.userServiceDataSource.updateUser(userDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userServiceDataSource.deleteUser(id);
  }
}
