import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/utils/roles/roles.enum';

export class CreateUserDto {

    @IsNotEmpty()
    role:Role

    @IsNotEmpty()
    username:string
    
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string

    @IsNotEmpty()
    namaLengkap: string

    @IsNotEmpty()
    tanggalLahir: string

    @IsNotEmpty()
    tempatLahir: string

    @IsNotEmpty()
    phoneNumber: string
}
