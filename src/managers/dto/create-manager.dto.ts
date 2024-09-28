import { IsEmail, IsNumber, IsString, Max, MaxLength } from 'class-validator';
import { Manager } from '../entities/manager.entity';

export class CreateManagerDto extends Manager{
    @IsString()
    @MaxLength(80)
    managerFullName: string;

    @IsNumber()
    managerSalary: number;

    @IsString()
    @IsEmail()
    managerEmail: string;

    @IsString()
    @MaxLength(20)
    managerPhoneNumber: string;
}
