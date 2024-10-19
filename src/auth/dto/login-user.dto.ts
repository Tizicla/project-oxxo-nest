import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";
export class LoginUserDto{
  @ApiProperty({
    default: "User email"
  })
  @IsString()
  @IsEmail()
  userEmail: string;

  @ApiProperty({
    default: "User password"
  })
  @IsString()
  @MinLength(8)
  userPassword: string;
}