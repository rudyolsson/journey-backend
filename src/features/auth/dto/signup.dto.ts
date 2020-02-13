import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  firstName: string;
  lastName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPassword: string;
  phoneNumber: string;
  country: string;
}
