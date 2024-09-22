import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from 'uuid'; //Se importa la librería uuid.
import { NotFoundError } from 'rxjs';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[]= [
  {
    id:uuid(),
    name: "John",
    lastname: "Doe",
    phoneNum: "1234567890"
  },
  {
    id:uuid(),
    name: "Jane",
    lastname: "Foster",
    phoneNum: "0987654321"
  }
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid(); //Se asigna un id único a cada empleado.
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() { //Hace que retorne todos los empleados.
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    if (!employee) throw new NotFoundException(`Employee with id ${id} not found`); //Si no se encuentra el empleado, se lanza un error.
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id); //Se llama al método findOne y se le pasa el id.
    employeeToUpdate = { //Se actualiza el objeto employee con los datos del updateEmployeeDto.
      ...employeeToUpdate, 
      ...updateEmployeeDto, 
    }
    
    this.employees = this.employees.map((employee) => {
      if (employee.id === id) {
        employee=employeeToUpdate;
      }
      return employee;
    })

    return employeeToUpdate;
  }

  remove(id: string) {
    this.findOne(id); //Se llama al método findOne y se le pasa el id.
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
