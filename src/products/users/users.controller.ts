import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor,UseInterceptors, SerializeOptions, SetMetadata, } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPointDto } from './dto/update-user-point.dto';
import { Roles } from 'src/utils/roles/roles.decorator';
import { Role } from 'src/utils/roles/roles.enum'
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';
import { Reflector } from '@nestjs/core';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly reflector: Reflector) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Post('checkDataPassword')
  checkDataPassword(@Body() resetPasswordUser: ResetPasswordUserDto) {
    return this.usersService.checkDataResetPassword(resetPasswordUser);
  }
  
  @Post('resetPassword')
  resetPassword(@Body() resetPasswordUser: ResetPasswordUserDto) {
    return this.usersService.resetPassword(resetPasswordUser);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  
  @Get('byRole/:role')
  findByRole(@Param('role') role: string) {
    return this.usersService.findByRoles(role);
  }

  @Patch()
  update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch()
  updatePoint(@Body('id') id: string, @Body() updateUserDto: UpdateUserPointDto) {
    return this.usersService.updatePoint(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
