import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get('/:id') // Decorador que indica que se va a recibir un parámetro en la ruta.
  findOne(
    @Param('id', new ParseUUIDPipe({version: '4'})) // Decorador que modifica el valor de id para que absorba el valor de la ruta.
    id: string 
  ) {
    return this.employeesService.findOne(id); // Se llama al método findOne del servicio y se le pasa el id. 
  }

  @Patch('/:id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete('/:id')
  remove(
  @Param('id', new ParseUUIDPipe({version: '4'})) 
  id:string
  ){
  return this.employeesService.remove(id);
  }
}
