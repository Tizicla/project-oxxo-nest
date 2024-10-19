import { Entity, Column, PrimaryGeneratedColumn , OneToOne, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Employee } from 'src/employees/entities/employee.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()   
    locationId: number;

    @ApiProperty({
        default: "Location Name"
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default: "Location Address"
    })
    @Column('text')
    locationAddress: string;  
    
    @ApiProperty({
        default: "Location Coordinates: [latitude, longitude]"
    })
    @Column('simple-array')
    locationCoordinates: number[];

    @OneToOne(()=> Manager, {
        eager:true,
    })
    @JoinColumn({
        name: "managerId"
    })
    manager:Manager;
    
    @ManyToOne(()=>Region, (region)=> region.locations)
    @JoinColumn({
        name:"regionId"
    })
    region: Region;
    @OneToMany(()=>Employee, (employee)=> employee.location)
    employees: Employee[];
    


}
