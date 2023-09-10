import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordUserDto {

    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string
}
