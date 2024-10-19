import { IsArray, IsString, MaxLength, ArrayNotEmpty, IsObject, IsOptional  } from 'class-validator';
import { Location } from '../entities/location.entity';
import { Region } from 'src/regions/entities/region.entity';


export class CreateLocationDto {
    @IsString() 
    @MaxLength(35)
    locationName: string;   
    @IsString() 
    @MaxLength(160)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationCoordinates: number[];  

    @IsObject()
    @IsOptional()
    region: Region;
}