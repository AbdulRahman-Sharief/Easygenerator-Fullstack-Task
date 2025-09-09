import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;
}
