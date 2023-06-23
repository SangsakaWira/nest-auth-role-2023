import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPointDto } from './dto/update-user-point.dto';
import { User, UserDocument } from './entities/user.entity';
import { Role } from 'src/utils/roles/roles.enum'
import { ResetPasswordUserDto } from './dto/reset-password-user.dto';

const saltOrRounds = 10;

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const password = await bcrypt.hash(createUserDto.password, saltOrRounds)
      const createUser = new this.userModel({
        ...createUserDto,
        password: password
      });
      return createUser.save();
    } catch (err) {
      return err
    }
  }
  
  async resetPassword(resetPasswordUser: ResetPasswordUserDto) {
    try {
      const newPassword = await bcrypt.hash(resetPasswordUser.password, saltOrRounds)
      
      let res = await this.userModel.updateOne({email: resetPasswordUser.email}, {$set:{password:newPassword}});
      return [{
        "modified": res.modifiedCount
      }]
    } catch (err) {
      return err
    }
  }
  
  async checkDataResetPassword(resetPasswordUser: ResetPasswordUserDto) {
    try {
      const user = await this.userModel.findOne({ email: resetPasswordUser.email, tanggalLahir: resetPasswordUser.tanggalLahir }).select('-password').select('-history').exec()
      switch (user == null) {
        case true:
          return []
          break;
      
        default:
          return [user]
          break;
      }
      
    } catch (err) {
      return err
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().select('-password').exec()
      return users
    } catch (err) {
      return err
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id }).select('-password').select('-history').exec()
      return [user]
    } catch (err) {
      return err
    }
  }

  async findOneByUsername(username: string) {
    try {
      const user = await this.userModel.findOne({ username: username }).exec()
      return user
    } catch (err) {
      return err
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email: email }).exec()
      return user
    } catch (err) {
      return err
    }
  }

  async findOneByEmailorUsername(value:string){
    try {
      const user = await this.userModel.findOne({$or:[{ email: value },{username:value}]}).exec()
      return user
    } catch (err) {
      return err
    }
  }
  
  async findByRoles(role: string) {
    try {
      const user = await this.userModel.find({ roles: role }).select('-password').exec()
      return user
    } catch (err) {
      return err
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findOneAndUpdate({
        _id: id
      }, updateUserDto, {
        new: true
      }).select('-password').exec()

      return user
    } catch (err) {
      return err
    }
  }

  async updatePoint(id: string, updateUserDto: UpdateUserPointDto) {
    try {
      const user = await this.userModel.findOneAndUpdate({
        _id: id
      }, {$inc : {point : updateUserDto.point}}, {
        new: true
      }).select('-password').exec()

      return user
    } catch (err) {
      return err
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.deleteOne({ _id: id }).exec();
      return user
    } catch (err) {
      return err
    }
  }
}
