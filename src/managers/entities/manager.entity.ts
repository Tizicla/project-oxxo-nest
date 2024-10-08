import { Column, Entity, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import { Location } from '../../locations/entities/location.entity';

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @Column('text')
    managerFullName: string;
    @Column('float')
    managerSalary: number;
    @Column('text')
    managerEmail: string;
    @Column('text')
    managerPhoneNumber: string;

    @OneToOne(()=>Location)
    location: Location;
}
