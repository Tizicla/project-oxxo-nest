import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/auth/entities/user.entity';

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

    @OneToOne(() => User)
    @JoinColumn({
        name: "userId"
    })
    user: User;
}
