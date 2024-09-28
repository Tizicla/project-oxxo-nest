import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    employeeID: string;
    
    @Column({type: "text"})
    name: string;
    
    @Column({type: "text"})
    lastName: string;
    
    @Column({type: "text"})
    phoneNumber: string;

    @Column({type: "text"})
    email: string;

    @Column({
        type: "text",
        nullable: true
    })
    photoUrl: string; // URL to the employee's photo

    
}
