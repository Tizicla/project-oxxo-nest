import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[]= [
  {
    id:1,
    name: "John",
    lastname: "Doe",
    phoneNum: "1234567890"
  },
  {
    id:2,
    name: "Jane",
    lastname: "Foster",
    phoneNum: "0987654321"
  }
  ]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length+1;
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() { //Hace que retorne todos los empleados.
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
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

  remove(id: number) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
