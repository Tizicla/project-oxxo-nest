import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()   
    locationId: number;
    @Column('text')
    locationName: string;
    @Column('text')
    locationAddress: string;    
    @Column('array')
    locationCoordinates: number[];
}
