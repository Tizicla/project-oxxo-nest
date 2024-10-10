import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeID: string;
    
    @Column('text')
    name: string;
    
    @Column('text' )
    lastName: string;
    
    @Column('text')
    phoneNumber: string;

    @Column('text')
    email: string;

    @Column({
        type: 'text',
        nullable: true
    })
    photoUrl: string; // URL to the employee's photo

    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
        name: "locationId"
    })
    location: Location;

    
}
