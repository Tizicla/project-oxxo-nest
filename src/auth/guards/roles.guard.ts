import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'; //CanActivate es una interfaz que permite implementar la lógica de autorización
import { Reflector } from '@nestjs/core';   //Reflector es una clase que permite acceder a los metadatos de una clase
import { Roles } from '../decorators/roles.decorator'; //Importa el decorador Roles
import { User } from '../entities/user.entity'; //Importa la entidad User

@Injectable() //Es un decorador que permite inyectar dependencias en una clase
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {} //Inyecta el Reflector en el constructor
  canActivate(context: ExecutionContext): boolean {
    //Reflector == metadata, es decir, información adicional sobre una clase, método, propiedad, etc.
    const roles = this.reflector.get(Roles, context.getHandler()); //Obtiene los roles del decorador Roles
    if (!roles) {
        return true;
    }
    const request = context.switchToHttp().getRequest(); //Obtiene la petición HTTP
    const user: User = request.user; //Obtiene el usuario de la petición
    return this.matchRoles(roles, user.userRoles); //Compara los roles del usuario con los roles requeridos
  }
  matchRoles(roles: string[], userRoles: string[]){
    let access = false;
    userRoles.forEach((userRole) => {
        if (roles.includes(userRole)) access = true;
    })
    return access;
  }
}