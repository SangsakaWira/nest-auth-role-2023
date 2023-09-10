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
}
