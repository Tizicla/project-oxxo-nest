import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from 'uuid'; //Se importa la librería uuid.
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  findAll() { //Hace que retorne todos los empleados.
    return this.employeeRepository.find();
  }

  findByLocation(id:number){
    return this.employeeRepository.findBy({
        location:{
          locationId:id
      }
    });
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeId: id
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const emploteeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    });
    this.employeeRepository.save(emploteeToUpdate);
    return emploteeToUpdate;
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    });
    return{
      message: `Employee with id ${id} has been deleted`
    }
  }
}
