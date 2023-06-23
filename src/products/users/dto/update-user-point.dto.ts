import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserPointDto extends PartialType(CreateUserDto) {
    point:number
}
