import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordUserDto {

    @IsEmail()
    email:string

    tanggalLahir: string

    password:string
}
