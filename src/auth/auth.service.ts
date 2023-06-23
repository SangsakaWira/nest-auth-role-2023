import { Injectable } from '@nestjs/common';
import { UsersService } from '../products/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ResetPasswordUserDto } from 'src/products/users/dto/reset-password-user.dto';
import { CreateUserDto } from 'src/products/users/dto/create-user.dto';

export type User = {
    email: string;
    password: string;
};

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<User> {
        try {
            const user = await this.usersService.findOneByEmailorUsername(email);            
            if (!user) {
                return {
                    email: "Pengguna tidak ditemukan",
                    password: ""
                }
            } 
            if (await bcrypt.compare(password, user.password)) {
                const { password, ...result } = user;
                return result;
            }
            return {
                email: "Password anda salah",
                password: ""
            };
        } catch (err) {
            return {
                email: "Terjadi kesalahan",
                password: ""
            }
        }
    }

    async login(user: any) {
        try {
            const singleUser = user._doc;
        
            if (singleUser == undefined) {
                return [
                    {
                        accessToken: "",
                        message: user.email
                    }
                ];
            } else {
                if (singleUser.password && (singleUser.email || singleUser.username)) {
                    const payload = { role:singleUser?.role, email: singleUser.email, _id: singleUser._id, fullname: singleUser.namaLengkap};
                    return [
                        {
                            accessToken: this.jwtService.sign(payload),
                            message: "success"
                        }
                    ];
                } else {
                    return [
                        {
                            accessToken: "Terjadi kesalahan token",
                            message: "failed"
                        }
                    ];
                }
            }
        }catch(err){
            return err
        }
    }

    async register(user: CreateUserDto) {
        try {
            const userRegister = await this.usersService.create(user)
            return [
                userRegister
            ]
        } catch (err) {
            return {
                statusCode: 500,
                message: "Something is Wrong!",
                err: err
            }
        }
    }

    async checkDataResetPassword(resetPasswordUser: ResetPasswordUserDto) {
        try {
        const user = await this.usersService.checkDataResetPassword(resetPasswordUser);
        switch (user == null) {
            case true:
            return
            break;
        
            default:
            return user
            break;
        }
        
        } catch (err) {
        return err
        }
    }
    
    async resetPassword(resetPasswordUser: ResetPasswordUserDto) {
        try {

            let res = await this.usersService.resetPassword(resetPasswordUser);
            return res
        } catch (err) {
            return err
        }
    }

    async getProfile(id: string) {
        const user = await this.usersService.findOne(id);
        return user;
    }
}
