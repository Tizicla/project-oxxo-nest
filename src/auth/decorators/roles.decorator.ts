import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>(); //Genera un decorador que recibe un arreglo de strings