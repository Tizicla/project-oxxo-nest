import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ApiAuth } from 'src/auth/decorators/api.decorator';

@ApiAuth()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example:
      {
        "employeeId": "UUID",
        "employeeName": "John",
        "employeeLastName": "Doe",
        "employeePhoneNumber": "1234567890",
        "employeeEmail": "john_doe@gmail.com!",
    } as Employee
  })


  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() file: Express.Multer.File){
    return "OK";
  }



  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }
  

  @Auth(ROLES.MANAGER)
  @Get('/:id') // Decorador que indica que se va a recibir un parámetro en la ruta.
  findOne(
    @Param('id', new ParseUUIDPipe({version: '4'})) // Decorador que modifica el valor de id para que absorba el valor de la ruta.
    id: string 
  ) {
    return this.employeesService.findOne(id); // Se llama al método findOne del servicio y se le pasa el id. 
  }

  @Auth(ROLES.MANAGER)
  @Get('location/:id')
  findAllLocation(@Param('id') id:string){
    return this.employeesService.findByLocation(+id);
  }


  @Auth(ROLES.EMPLOYEE)
  @Patch('/:id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete('/:id')
  remove(
  @Param('id', new ParseUUIDPipe({version: '4'})) 
  id:string
  ){
  return this.employeesService.remove(id);
  }
}
