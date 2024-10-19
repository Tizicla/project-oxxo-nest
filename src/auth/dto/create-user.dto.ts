import { IsEmail, IsOptional, IsString, MinLength, IsIn } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto extends User {
    @ApiProperty({
        default: "User email"
    })
    @IsEmail()
    userEmail: string;

    @ApiProperty({
        default: "User password"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;

    @ApiProperty({
        default: "User roles"
    })
    @IsOptional()
    @IsIn(["Admin", "Employee", "Manager"])
    userRoles: string[];
}
